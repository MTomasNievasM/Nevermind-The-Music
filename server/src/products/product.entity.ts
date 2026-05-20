import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Purchase } from '../purchases/purchase.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('double')
  price: number;

  @Column()
  image: string;

  @Column()
  category: string;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases: Purchase[];
}
