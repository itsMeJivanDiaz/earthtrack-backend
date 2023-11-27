import { Controller } from '@nestjs/common';
import { ProductService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsSearchModel } from './products.inteface';
import { ProductDTO } from './products.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'add_product' })
  async insertProduct(data: ProductDTO) {
    return await this.productService.insertProduct(data);
  }

  @MessagePattern({ cmd: 'get_products' })
  async getProducts() {
    return await this.productService.getProducts();
  }

  @MessagePattern({ cmd: 'get_product_by_id' })
  async getProductById(id: string) {
    return await this.productService.getProductById(id);
  }

  @MessagePattern({ cmd: 'get_products_by_category' })
  async getProductsByCategory(data: ProductsSearchModel) {
    return await this.productService.getProductsByCategory(data);
  }

  @MessagePattern({ cmd: 'search_products' })
  async searchProducts(data: ProductsSearchModel) {
    return await this.productService.searchProducts(data);
  }

  @MessagePattern({ cmd: 'update_product' })
  async updateProduct(data: ProductDTO) {
    return await this.productService.updateProduct(data);
  }

  @MessagePattern({ cmd: 'delete_product' })
  async deleteProduct(id: string) {
    return await this.productService.deleteProduct(id);
  }
}
