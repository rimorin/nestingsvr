import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PaginationMiddleware } from './middleware/pagination.middleware';
import { HelpersModule } from './helpers/helpers.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './schedule/schedule.service';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), HelpersModule],
  controllers: [AppController],
  providers: [AppService, ScheduleService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes('*');
  }
}
