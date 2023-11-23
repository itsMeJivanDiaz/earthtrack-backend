import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ProductModel } from './interfaces/inventory-product.interface';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/guard/auth.decorator';

@Controller('api/product')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Roles(['admin', 'auditor'])
  @UseGuards(AuthGuard)
  @Post()
  addProduct(@Body() data: ProductModel) {
    return this.inventoryService.addProduct(data);
  }

  @Roles(['admin', 'auditor', 'guest'])
  @UseGuards(AuthGuard)
  @Get()
  getProducts() {
    return this.inventoryService.getProducts();
  }

  @Roles(['admin', 'auditor', 'guest'])
  @UseGuards(AuthGuard)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.inventoryService.getProductById(id);
  }

  @Roles(['admin', 'auditor', 'guest'])
  @UseGuards(AuthGuard)
  @Get(':search/:page/:limit')
  searchProducts(
    @Param('search') search: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    return this.inventoryService.searchProducts(search, page, limit);
  }

  @Roles(['auditor'])
  @UseGuards(AuthGuard)
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() data: ProductModel) {
    return this.inventoryService.updateProduct(id, data);
  }

  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.inventoryService.deleteProduct(id);
  }
}
