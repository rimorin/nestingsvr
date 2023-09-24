import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize';
import { initModels, models, orders, users } from './../models/init-models';

export interface UsersResult {
  results: users[];
  totalPages: number;
}

export interface OrdersResult {
  results: orders[];
  totalPages: number;
}

@Injectable()
export class AppService {
  private models: models;

  constructor(private configService: ConfigService) {
    const dbHost = this.configService.get<string>('DB_HOST', 'localhost');
    const dbPort = this.configService.get<number>('DB_PORT', 5432);
    const dbUser = this.configService.get<string>('DB_USER', 'postgres');
    const dbPass = this.configService.get<string>('DB_PASS', 'postgres');
    const dbName = this.configService.get<string>('DB_NAME', 'postgres');

    // initialize the models
    this.models = initModels(
      new Sequelize(dbName, dbUser, dbPass, {
        host: dbHost,
        port: dbPort,
        dialect: 'postgres',
      }),
    );
  }

  // implement pagination of getOrders by taking in a page number and page size and passing it to the findAll method
  async getOrders(page, pageSize): Promise<OrdersResult> {
    const results = await this.models.orders.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    // calculate total pages
    const total = await this.models.orders.count();
    const totalPages = Math.ceil(total / pageSize);

    return {
      results: results,
      totalPages: totalPages,
    };
  }

  async getUsers(page, pageSize): Promise<UsersResult> {
    const results = await this.models.users.findAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    // calculate total pages
    const total = await this.models.users.count();
    const totalPages = Math.ceil(total / pageSize);

    return {
      results: results,
      totalPages: totalPages,
    };
  }
}
