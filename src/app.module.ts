import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PaginationMiddleware } from './middleware/pagination.middleware';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [ConfigModule.forRoot(), HelpersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes('*');
  }
}
