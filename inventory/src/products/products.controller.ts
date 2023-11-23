import { Controller } from '@nestjs/common';
import { ProductService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsSearchModel } from './products.inteface';
import { ProductDTO } from './products.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'add_product' })
  insertProduct(data: ProductDTO) {
    return this.productService.insertProduct(data);
  }

  @MessagePattern({ cmd: 'get_products' })
  getProducts() {
    return this.productService.getProducts();
  }

  @MessagePattern({ cmd: 'get_product_by_id' })
  getProductById(id: string) {
    return this.productService.getProductById(id);
  }

  @MessagePattern({ cmd: 'search_products' })
  searchProducts(data: ProductsSearchModel) {
    return this.productService.searchProducts(data);
  }

  @MessagePattern({ cmd: 'update_product' })
  updateProduct(data: ProductDTO) {
    return this.productService.updateProduct(data);
  }

  @MessagePattern({ cmd: 'delete_product' })
  deleteProduct(id: string): any {
    return this.productService.deleteProduct(id);
  }
}
