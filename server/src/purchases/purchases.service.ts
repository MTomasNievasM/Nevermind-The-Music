import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {}

  async crearCompra(userId: number, productId: string | number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const numProductId = typeof productId === 'string' ? parseInt(productId.replace(/\D/g, '')) || 999 : productId;

    let product = await this.productsRepository.findOne({ where: { id: numProductId } });
    
    if (!product) {
      product = this.productsRepository.create({
        id: numProductId,
        name: `Instrumento Simulado ID ${productId}`,
        price: 1200,
        image: '/electric_guitar_white.png',
        category: 'Guitarras'
      });
      await this.productsRepository.save(product);
    }

    const purchase = this.purchasesRepository.create({
      user,
      product,
      fechaPago: new Date()
    });

    await this.purchasesRepository.save(purchase);

    return {
      message: 'Compra simulada con éxito en la relación N:N',
      id: purchase.id,
      fechaPago: purchase.fechaPago,
      usuario: user.nombre,
      producto: product.name,
      precio: product.price
    };
  }

  async obtenerComprasUsuario(userId: number) {
    return this.purchasesRepository.find({
      where: { user: { id: userId } },
      relations: { product: true }
    });
  }
}
