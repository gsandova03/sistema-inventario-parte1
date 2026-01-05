import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Controller('productos')
export class ProductosController {

  constructor(private readonly productosService: ProductosService) {}

  @Get('')
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  create(@Body() CrearProductoDto: CrearProductoDto) {
    return this.productosService.create(CrearProductoDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() ActualizarProductoDto: ActualizarProductoDto) {
    return this.productosService.update(id, ActualizarProductoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.productosService.remove(id);
  }
}
