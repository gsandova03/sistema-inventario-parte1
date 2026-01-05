import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepositorio: Repository<Categoria>,
  ) {}

  findAll() {
    return this.categoriaRepositorio.find();
  }

  async findOne(id: number) {
    const category = await this.categoriaRepositorio.findOne({ where: { id }, relations: ['products'] });
    if (!category) throw new NotFoundException(`Categoría #${id} no encontrada`);
    return category;
  }

  create(data: CrearCategoriaDto) {
    const category = this.categoriaRepositorio.create(data);
    return this.categoriaRepositorio.save(category);
  }

  async update(id: number, data: ActualizarCategoriaDto) {
    const category = await this.categoriaRepositorio.preload({ id, ...data });
    if (!category) throw new NotFoundException(`Categoría #${id} no existe`);
    return this.categoriaRepositorio.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoriaRepositorio.remove(category);
  }
}
