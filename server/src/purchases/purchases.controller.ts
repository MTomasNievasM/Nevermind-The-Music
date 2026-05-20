import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @Post('crear')
  crear(@Body() body: any) {
    return this.purchasesService.crearCompra(body.userId, body.productId);
  }

  @Get('usuario/:userId')
  obtenerCompras(@Param('userId') userId: string) {
    return this.purchasesService.obtenerComprasUsuario(parseInt(userId));
  }
}
