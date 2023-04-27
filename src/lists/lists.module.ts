import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { HttpModule } from '@nestjs/axios';
import { ListGatewaySequelaze } from './gateways/list-gateways-sequelize';
import { ListGatewayHttp } from './gateways/list-gateways-http';
import { CreatedListInCrm } from './listeners/created-list.in.crm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost/8000',
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelaze,
    ListGatewayHttp,
    CreatedListInCrm,
    {
      provide: 'ListPersistGateway',
      useExisting: ListGatewaySequelaze,
    },
    {
      provide: 'ListIntegrateGateway',
      useExisting: ListGatewayHttp,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
