import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto';
import { CategoriasService } from './categorias.service';

@Controller('categorias')
export class CategoriasController {

  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriasService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() CrearCategoriaDto: CrearCategoriaDto) {
    return this.categoriasService.create(CrearCategoriaDto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() ActualizarCategoriaDto: ActualizarCategoriaDto) {
    return this.categoriasService.update(id ,ActualizarCategoriaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.categoriasService.remove(id);
  }
}
