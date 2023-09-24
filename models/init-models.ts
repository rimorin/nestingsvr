import type { Sequelize } from 'sequelize';
import { orders as _orders } from './orders';
import type { ordersAttributes, ordersCreationAttributes } from './orders';
import { users as _users } from './users';
import type { usersAttributes, usersCreationAttributes } from './users';

export { _orders as orders, _users as users };

export type {
  ordersAttributes,
  ordersCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export interface models {
  orders: typeof _orders;
  users: typeof _users;
}

export function initModels(sequelize: Sequelize) {
  const orders = _orders.initModel(sequelize);
  const users = _users.initModel(sequelize);

  orders.belongsTo(users, { as: 'customer', foreignKey: 'customer_id' });
  users.hasMany(orders, { as: 'orders', foreignKey: 'customer_id' });

  return {
    orders: orders,
    users: users,
  };
}
