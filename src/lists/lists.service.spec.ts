import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { ListGatewayInMemory } from './gateways/list-gateways-in-memory';

const mockHttpService = {
  post: jest.fn(),
};
describe('ListsService', () => {
  let service: ListsService;
  let listPersistGateway: ListGatewayInMemory;
  let listIntegrateGateway: ListGatewayInMemory;

  beforeEach(() => {
    listPersistGateway = new ListGatewayInMemory();
    listIntegrateGateway = new ListGatewayInMemory();

    service = new ListsService(listPersistGateway, listIntegrateGateway);
  });

  it('', async () => {
    const resp = await service.create({ name: 'minha lista' });
    expect(listPersistGateway.items).toEqual([resp]);
  });
});
