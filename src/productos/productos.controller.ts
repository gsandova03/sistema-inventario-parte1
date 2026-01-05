import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('productos')
export class ProductosController {
  @Get('')
  findAll() {
    return 'todos los productos';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'producto por id';
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  create(@Body() createCategoriaDto) {
    return 'crear producto';
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCategoriaDto) {
    return 'actualizar producto';
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return 'eliminar producto';
  }
}
