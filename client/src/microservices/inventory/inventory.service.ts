import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductModel } from './interfaces/inventory-product.interface';
import { ProductsSearchModel } from './interfaces/inventory-product.interface';

@Injectable()
export class InventoryService {
  constructor(@Inject('INVENTORY_SERVICE') private client: ClientProxy) {}

  addProduct(data: ProductModel) {
    return this.client.send({ cmd: 'add_product' }, data);
  }

  getProducts() {
    return this.client.send({ cmd: 'get_products' }, {});
  }

  getProductById(id: string) {
    return this.client.send({ cmd: 'get_product_by_id' }, id);
  }

  searchProducts(searchTerm: string, page: number = 1, limit: number = 10) {
    const search: ProductsSearchModel = {
      searchTerm: searchTerm,
      page: page,
      limit: limit,
    };
    return this.client.send({ cmd: 'search_products' }, search);
  }

  updateProduct(id: string, data: ProductModel) {
    data.id = id;
    return this.client.send({ cmd: 'update_product' }, data);
  }

  deleteProduct(id: string) {
    return this.client.send({ cmd: 'delete_product' }, id);
  }
}
