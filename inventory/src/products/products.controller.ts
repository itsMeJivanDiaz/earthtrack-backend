import { Controller } from '@nestjs/common';
import { ProductService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'add_product' })
  addProduct(): any {
    return this.productService.insertProduct();
  }

  @MessagePattern({ cmd: 'get_product' })
  getProduct(): any {
    return this.productService.readProduct();
  }

  @MessagePattern({ cmd: 'edit_product' })
  editProduct(): any {
    return this.productService.updateProduct();
  }

  @MessagePattern({ cmd: 'remove_product' })
  removeProduct(): any {
    return this.productService.deleteProduct();
  }
}
