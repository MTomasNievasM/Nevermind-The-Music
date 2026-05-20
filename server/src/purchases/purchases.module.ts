import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, User, Product])
  ],
  providers: [PurchasesService],
  controllers: [PurchasesController],
  exports: [PurchasesService]
})
export class PurchasesModule {}
