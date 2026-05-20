import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  fechaPago: Date;

  @ManyToOne(() => User, (user) => user.purchases, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (product) => product.purchases, { onDelete: 'CASCADE' })
  product: Product;
}
