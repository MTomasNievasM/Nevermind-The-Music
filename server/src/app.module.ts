import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Purchase } from './purchases/purchase.entity';
import { PurchasesModule } from './purchases/purchases.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DATABASE_PATH || 'database.sqlite', // Configurable para persistencia en producción
      entities: [User, Product, Purchase],
      synchronize: true, // Auto-crea las tablas (ideal para desarrollo)
    }),
    AuthModule,
    PurchasesModule,
    ProductsModule,
  ],
})
export class AppModule {}

