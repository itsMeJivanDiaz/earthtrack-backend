import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/auth.guard.decorator';
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import {
  DeleteProductResponseDTO,
  ProductDTO,
  SearchProductResponseDTO,
} from './inventory-product.dto';
import { ErrorResponse } from 'src/shared/error-response';

@Controller('api/product')
@ApiTags('Inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiBody({ type: ProductDTO })
  @ApiResponse({ status: 200, description: 'Success', type: ProductDTO })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  @Roles(['admin', 'auditor'])
  @UseGuards(AuthGuard)
  @Post()
  addProduct(@Body() data: ProductDTO) {
    return this.inventoryService.addProduct(data);
  }

  @ApiResponse({ status: 200, description: 'success', type: [ProductDTO] })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: ErrorResponse,
  })
  @Roles(['admin', 'auditor', 'guest'])
  @UseGuards(AuthGuard)
  @Get()
  getProducts() {
    return this.inventoryService.getProducts();
  }

  @ApiQuery({ name: 'query', required: true })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: SearchProductResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: ErrorResponse,
  })
  @Roles(['admin', 'auditor', 'guest'])
  @UseGuards(AuthGuard)
  @Get('/search')
  searchProducts(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.inventoryService.searchProducts({ query, page, limit });
  }

  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'success', type: ProductDTO })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: ErrorResponse,
  })
  @Roles(['admin', 'auditor', 'guest'])
  @UseGuards(AuthGuard)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.inventoryService.getProductById(id);
  }

  @ApiBody({ type: ProductDTO })
  @ApiResponse({ status: 200, description: 'success', type: ProductDTO })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: ErrorResponse,
  })
  @Roles(['auditor'])
  @UseGuards(AuthGuard)
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() data: ProductDTO) {
    return this.inventoryService.updateProduct(id, data);
  }

  @ApiResponse({
    status: 200,
    description: 'success',
    type: DeleteProductResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: ErrorResponse,
  })
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.inventoryService.deleteProduct(id);
  }
}
