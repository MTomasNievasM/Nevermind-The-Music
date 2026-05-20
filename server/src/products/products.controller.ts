import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async crear(@Body() data: Partial<Product>) {
    return this.productsService.crear(data);
  }

  @Get()
  async obtenerTodos(@Query('query') query?: string) {
    return this.productsService.obtenerTodos(query);
  }

  @Get(':id')
  async obtenerDetalle(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.obtenerDetalle(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Product>,
  ) {
    return this.productsService.actualizar(id, data);
  }

  @Delete(':id')
  async borrar(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.borrar(id);
  }
}
