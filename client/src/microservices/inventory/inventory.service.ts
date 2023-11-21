import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InventoryService {
  constructor(@Inject('INVENTORY_SERVICE') private client: ClientProxy) {}

  addProduct() {
    return this.client.send({ cmd: 'add_product' }, {});
  }
}
