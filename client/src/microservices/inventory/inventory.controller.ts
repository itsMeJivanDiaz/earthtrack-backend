import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ProductDTO } from './dto/inventory-product.dto';

@Controller('api/product')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  addProduct(@Body() data: ProductDTO) {
    return this.inventoryService.addProduct(data);
  }

  @Get()
  getProducts() {
    return this.inventoryService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.inventoryService.getProductById(id);
  }

  @Get(':search/:page/:limit')
  searchProducts(
    @Param('search') search: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    return this.inventoryService.searchProducts(search, page, limit);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() data: ProductDTO) {
    return this.inventoryService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.inventoryService.deleteProduct(id);
  }
}
