import { InjectModel } from '@nestjs/sequelize';
import { List } from '../entities/list.entity';
import { ListModel } from '../entities/list.model';
import { error } from 'console';
import { ListGatewayInterface } from './list-gateways-interface';

export class ListGatewaySequelaze implements ListGatewayInterface {
  constructor(
    @InjectModel(ListModel)
    private listModel: typeof ListModel,
  ) {}

  async create(list: List): Promise<List> {
    const newList = await this.listModel.create(list);
    list.id = newList.id;
    return list;
  }

  async findAll(): Promise<List[]> {
    const listModel = await this.listModel.findAll();
    return listModel.map((x) => new List(x.name, x.id));
  }

  async findById(id: number): Promise<List> {
    const newListid = await this.listModel.findByPk(id);
    if (!newListid) {
      throw new error('not exist');
    }
    return new List(newListid.name, newListid.id);
  }
}
