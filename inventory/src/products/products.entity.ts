import { DecimalColumnTransformer } from 'src/helper/product.transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '60' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: '60' })
  category: string;

  @Column('decimal', {
    transformer: new DecimalColumnTransformer(),
  })
  price: number;
}
