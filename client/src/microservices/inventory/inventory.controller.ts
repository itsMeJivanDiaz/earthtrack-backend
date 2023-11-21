import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  addProduct() {
    return this.inventoryService.addProduct();
  }
}
