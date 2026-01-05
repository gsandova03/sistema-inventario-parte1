import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { LessThan, Repository } from 'typeorm';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { Categoria } from 'src/categorias/categoria.entity';
import { TipoUsuario } from 'src/usuarios/usuario.entity';

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

  async create(data: CrearProductoDto, user: any) {

    const existe = await this.categoriaRepositorio.findOne({ where: { id: data.categoria_id } });

    if (!existe) throw new NotFoundException(`La categoría #${data.categoria_id} no existe`);
    
    const product = this.productoRepositorio.create({
      ...data,
      creador_id: user.id,
    });
    return this.productoRepositorio.save(product);
  }

  async update(id: number, data: ActualizarProductoDto, user: any) {
    await this.validarCreador(id, user);
    const product = await this.productoRepositorio.preload({ id, ...data });
    if (!product) throw new NotFoundException(`Producto #${id} no existe`);
    return this.productoRepositorio.save(product);
  }

  async updateStock(id: number, stock: number, user: any) {
    await this.validarCreador(id, user);
    const product = await this.productoRepositorio.preload({ id, stock });
    if (!product) throw new NotFoundException(`Producto #${id} no existe`);
    return this.productoRepositorio.save(product);
  }

  async findMyProducts(userId: number) {
    return this.productoRepositorio.find({ where: { creador_id: userId } });
  }

  async findLowStockProducts(treshold: number = 10) {
    return this.productoRepositorio.find({
      where: { stock: LessThan(treshold) },
      relations: ['categoria', 'creador'],
    });
  }

  async remove(id: number, user: any) {
    await this.validarCreador(id, user);
    await this.findOne(id);
    const product = await this.findOne(id);
    return this.productoRepositorio.remove(product);
  }

  async validarCreador(productoId: number, user: any) {
    const producto = await this.findOne(productoId);

    if(user.rol !== TipoUsuario.ADMIN && producto.creador_id !== user.id) {
      throw new NotFoundException(`No tienes permisos para editar este producto`);
    }

    return producto;
  }
}
