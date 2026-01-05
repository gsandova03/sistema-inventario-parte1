import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('categorias')
export class CategoriasController {
  @Get('')
  findAll() {
    return 'todas las categorias';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'categoria por id';
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  create(@Body() createCategoriaDto) {
    return 'crear categoria';
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCategoriaDto) {
    return 'actualizar categoria';
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return 'eliminar categoria';
  }
}
