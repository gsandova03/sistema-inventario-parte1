import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../categorias/categoria.entity';

@Entity('products')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'integer' })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column()
  categoria_id: number;
}