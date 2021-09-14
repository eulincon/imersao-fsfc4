import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'transactions',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Transaction extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;
  @Column({ allowNull: false })
  payment_date: Date;
  @Column({ allowNull: false })
  name: string;
  @Column({ allowNull: false })
  description: string;
  @Column({ allowNull: false })
  category: string;
  @Column({ allowNull: false })
  amount: number;
  @Column({ allowNull: false })
  type: string;
}
