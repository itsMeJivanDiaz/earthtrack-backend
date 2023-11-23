import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '60' })
  firstname: string;

  @Column({ type: 'varchar', length: '60' })
  lastname: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'auditor', 'guest'],
    default: 'guest',
  })
  role: 'admin' | 'editor' | 'guest';

  @Column({ type: 'varchar', length: '60' })
  username: string;

  @Column({ type: 'varchar', length: '60' })
  userpassword: string;
}
