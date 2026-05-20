import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async crear(data: Partial<Product>): Promise<Product> {
    const nuevoProducto = this.productsRepository.create(data);
    return this.productsRepository.save(nuevoProducto);
  }

  async obtenerTodos(query?: string): Promise<Product[]> {
    if (query) {
      const queryPattern = `%${query}%`;
      return this.productsRepository.find({
        where: [
          { name: Like(queryPattern) },
          { category: Like(queryPattern) },
        ],
      });
    }
    return this.productsRepository.find();
  }

  async obtenerDetalle(id: number): Promise<Product> {
    const producto = await this.productsRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async actualizar(id: number, data: Partial<Product>): Promise<Product> {
    const producto = await this.obtenerDetalle(id);
    const productoActualizado = this.productsRepository.merge(producto, data);
    return this.productsRepository.save(productoActualizado);
  }

  async borrar(id: number): Promise<{ mensaje: string }> {
    const producto = await this.obtenerDetalle(id);
    await this.productsRepository.remove(producto);
    return { mensaje: `Producto con ID ${id} eliminado correctamente` };
  }
}
