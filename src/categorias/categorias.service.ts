import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return await this.categoriaRepositorio
    .createQueryBuilder('categoria')
    .loadRelationCountAndMap('categoria.totalProductos', 'categoria.productos')
    .getMany();
  }

  async findOne(id: number) {
    const category = await this.categoriaRepositorio.findOne({ where: { id }, relations: ['productos'] });
    if (!category) throw new NotFoundException(`Categoría #${id} no encontrada`);
    return category;
  }

  async create(data: CrearCategoriaDto) {
    const existe = await this.categoriaRepositorio.findOne({ 
      where: { nombre: data.nombre } 
    });
    
    if (existe) {
      throw new ConflictException('El nombre de la categoría ya existe');
    }

    const category = this.categoriaRepositorio.create(data);
    return await this.categoriaRepositorio.save(category);
  }

  async update(id: number, data: ActualizarCategoriaDto) {

    if (data.nombre){
      const existe = await this.categoriaRepositorio.findOne({
        where: {nombre: data.nombre}
      })

      if(existe && existe.id !== id){
        throw new ConflictException('El nombre ya esta en uso por otra categoria')
      }
    }

    const category = await this.categoriaRepositorio.preload({ id, ...data });
    if (!category) throw new NotFoundException(`Categoría #${id} no existe`);
    return this.categoriaRepositorio.save(category);
  }

  async remove(id: number) {
    const categoria = await this.categoriaRepositorio.findOne({
      where: {id},
      relations: ['productos']
    });

    if(!categoria){
      throw new NotFoundException(`Categoría #${id} no encontrada`);
    }

    if (categoria.productos && categoria.productos.length > 0) {
      throw new BadRequestException(
        `No se puede eliminar la categoría porque tiene ${categoria.productos.length} productos asociados`
      );
    }
    return this.categoriaRepositorio.remove(categoria);
  }
}
