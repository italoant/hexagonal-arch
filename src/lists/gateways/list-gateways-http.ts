import { HttpService } from '@nestjs/axios';
import { List } from '../entities/list.entity';
import { ListGatewayInterface } from './list-gateways-interface';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpsService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    lastValueFrom(
      await this.httpsService.post('list', {
        name: list.name,
      }),
    );
    return list;
  }
  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpsService.get<any[]>('list'));
    return data.map((x) => new List(x.name, x.id));
  }
  async findById(id?: number): Promise<List> {
    const { data } = await lastValueFrom(
      this.httpsService.get<any>('list/${id}'),
    );
    return new List(data.name, data.id);
  }
}
