import { Controller, Get, Query } from '@nestjs/common';
import { AppService, OrdersResult, UsersResult } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('/orders')
  getOrders(
    @Query('page') page?,
    @Query('pageSize') pageSize?,
  ): Promise<OrdersResult> {
    return this.appService.getOrders(page, pageSize);
  }

  @Get('/users')
  getUsers(
    @Query('page') page?,
    @Query('pageSize') pageSize?,
  ): Promise<UsersResult> {
    console.log(`getUsers(${page}, ${pageSize})`);
    return this.appService.getUsers(page, pageSize);
  }
}
