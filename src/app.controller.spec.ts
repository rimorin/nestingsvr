import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { orders } from './../models/orders';
import { users } from './../models/users';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;
  const page = 1;
  const pageSize = 10;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('orders', () => {
    it('should return orders', async () => {
      const mockCount = 1;
      const mockOrders = [
        orders.build({
          id: 1,
          customer_id: 'test',
          customer_name: 'test',
          total: 100,
        }),
      ];
      jest.spyOn(orders, 'findAll').mockImplementation(() => {
        return Promise.resolve(mockOrders);
      });
      jest.spyOn(orders, 'count').mockImplementation(() => {
        return Promise.resolve(mockCount);
      });
      const result = await appController.getOrders(page, pageSize);
      expect(result).toEqual({
        results: mockOrders,
        totalPages: mockCount,
      });
    });
  });

  describe('users', () => {
    it('should return users', async () => {
      const mockUsers = [
        users.build({
          id: 'test',
        }),
      ];
      const mockCount = 1;
      jest.spyOn(users, 'findAll').mockImplementation(() => {
        return Promise.resolve(mockUsers);
      });
      jest.spyOn(users, 'count').mockImplementation(() => {
        return Promise.resolve(mockCount);
      });
      const result = await appController.getUsers(page, pageSize);
      expect(result).toEqual({
        results: mockUsers,
        totalPages: mockCount,
      });
    });
  });
});
