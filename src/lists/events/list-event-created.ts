import { List } from '../entities/list.entity';

export class ListEventCreated {
  constructor(public list: List) {}
}
