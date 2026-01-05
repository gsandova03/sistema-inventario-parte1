import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { Repository } from 'typeorm';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { Categoria } from 'src/categorias/categoria.entity';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepositorio: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepositorio: Repository<Categoria>,
  ) {}

  findAll() {
    return this.productoRepositorio.find({ relations: ['categoria'] });
  }

  async findOne(id: number) {
    const product = await this.productoRepositorio.findOne({ where: { id }, relations: ['categoria'] });
    if (!product) throw new NotFoundException(`Producto #${id} no encontrado`);
    return product;
  }

  async create(data: CrearProductoDto) {

    const existe = await this.categoriaRepositorio.findOne({ where: { id: data.categoria_id } });

    if (!existe) throw new NotFoundException(`La categoría #${data.categoria_id} no existe`);
    
    const product = this.productoRepositorio.create(data);
    return this.productoRepositorio.save(product);
  }

  async update(id: number, data: ActualizarProductoDto) {
    const product = await this.productoRepositorio.preload({ id, ...data });
    if (!product) throw new NotFoundException(`Producto #${id} no existe`);
    return this.productoRepositorio.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productoRepositorio.remove(product);
  }

}
