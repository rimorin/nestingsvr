import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationMiddleware } from './middleware/pagination.middleware';
import { HelpersModule } from './helpers/helpers.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule/schedule.service';
import { QueueModule } from './queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from './app.constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
        },
      }),
    }),
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
    HelpersModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService, ScheduleService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes('*');
  }
}
