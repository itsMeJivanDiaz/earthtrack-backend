import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '225' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: '255' })
  category: string;

  @Column({ type: 'decimal' })
  price: number;
}
