import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SearchModel } from './inventory.interface';
import { ProductDTO } from './inventory-product.dto';

@Injectable()
export class InventoryService {
  constructor(@Inject('INVENTORY_MICROSERVICE') private client: ClientProxy) {}

  addProduct(data: ProductDTO) {
    return this.client.send({ cmd: 'add_product' }, data);
  }

  getProducts() {
    return this.client.send({ cmd: 'get_products' }, {});
  }

  getProductById(id: string) {
    return this.client.send({ cmd: 'get_product_by_id' }, id);
  }

  searchProducts(data: SearchModel) {
    return this.client.send({ cmd: 'search_products' }, data);
  }

  updateProduct(id: string, data: ProductDTO) {
    data.id = id;
    return this.client.send({ cmd: 'update_product' }, data);
  }

  deleteProduct(id: string) {
    return this.client.send({ cmd: 'delete_product' }, id);
  }
}
