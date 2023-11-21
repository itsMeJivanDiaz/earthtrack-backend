import { Injectable } from '@nestjs/common';
import { Product } from './products.interface';

@Injectable()
export class ProductService {
  product: Product[] = [
    {
      id: 'a0cb2340-bbcxwda',
      name: 'sample_product',
      description: 'this is just a sample product',
      category: 'dry',
      price: 40.5,
    },
  ];

  insertProduct() {
    return this.product;
  }

  readProduct() {
    return this.product;
  }

  updateProduct() {
    return this.product;
  }

  deleteProduct() {
    return this.product;
  }
}
