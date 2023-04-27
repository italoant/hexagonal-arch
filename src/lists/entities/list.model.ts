import { Column, Table, Model } from 'sequelize-typescript';
import { List } from './list.entity';

@Table
export class ListModel extends Model<List> {
  @Column
  name: string;
}
