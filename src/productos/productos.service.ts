import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepositorio: Repository<Producto>,
  ) {}

  findAll() {
    return this.productoRepositorio.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const product = await this.productoRepositorio.findOne({ where: { id }, relations: ['category'] });
    if (!product) throw new NotFoundException(`Producto #${id} no encontrado`);
    return product;
  }

  create(data: any) {
    const product = this.productoRepositorio.create(data);
    return this.productoRepositorio.save(product);
  }

  async update(id: number, data: any) {
    const product = await this.productoRepositorio.preload({ id, ...data });
    if (!product) throw new NotFoundException(`Producto #${id} no existe`);
    return this.productoRepositorio.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productoRepositorio.remove(product);
  }

}
