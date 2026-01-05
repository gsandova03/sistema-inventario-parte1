import { Producto } from 'src/productos/producto.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

export enum TipoUsuario {
  ADMIN = 'ADMIN',
  USUARIO = 'USUARIO',
}

@Entity('users')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: TipoUsuario,
    default: TipoUsuario.USUARIO,
  })
  rol: TipoUsuario;

  @OneToMany(() => Producto, (producto) => producto.creador)
  productos: Producto[];
}