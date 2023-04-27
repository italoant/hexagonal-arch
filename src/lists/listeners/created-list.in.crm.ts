import { OnEvent } from '@nestjs/event-emitter';
import { ListEventCreated } from '../events/list-event-created';
import { ListGatewayInterface } from '../gateways/list-gateways-interface';
import { Inject } from '@nestjs/common';

export class CreatedListInCrm {
  constructor(
    @Inject('ListIntegrateGateway')
    private listIntegrate: ListGatewayInterface,
  ) {}

  @OnEvent('list.created')
  handle(event: ListEventCreated) {
    this.listIntegrate.create(event.list);
  }
}
