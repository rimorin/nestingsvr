import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { users, usersId } from './users';

export interface ordersAttributes {
  id: number;
  customer_name?: string;
  total?: number;
  customer_id?: string;
}

export type ordersPk = 'id';
export type ordersId = orders[ordersPk];
export type ordersOptionalAttributes =
  | 'customer_name'
  | 'total'
  | 'customer_id';
export type ordersCreationAttributes = Optional<
  ordersAttributes,
  ordersOptionalAttributes
>;

export class orders
  extends Model<ordersAttributes, ordersCreationAttributes>
  implements ordersAttributes
{
  id!: number;
  customer_name?: string;
  total?: number;
  customer_id?: string;

  // orders belongsTo users via customer_id
  customer!: users;
  getCustomer!: Sequelize.BelongsToGetAssociationMixin<users>;
  setCustomer!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createCustomer!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof orders {
    return orders.init(
      {
        id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        customer_name: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        total: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },
        customer_id: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'orders',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'orders_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
}
