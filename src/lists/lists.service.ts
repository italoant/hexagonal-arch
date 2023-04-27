import { Inject, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { error } from 'console';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ListGatewayInterface } from './gateways/list-gateways-interface';
import { List } from './entities/list.entity';
import EventEmitter from 'events';
import { ListEventCreated } from './events/list-event-created';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListPersistGateway')
    private listPersistGateway: ListGatewayInterface, //porta
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter, // @Inject('ListIntegrateGateway') // private listIntegrateGateway: ListGatewayInterface, //porta2
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new List(createListDto.name);
    await this.listPersistGateway.create(list);
    this.eventEmitter.emit('list.created', new ListEventCreated(list));
    // await this.listIntegrateGateway.create(list);
    return list;
  }

  findAll() {
    return this.listPersistGateway.findAll();
  }

  async findOne(id: number) {
    const list = await this.listPersistGateway.findById(id);
    if (!list) {
      throw new error('lista nao existe');
    }
    return list;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
