import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('productos')
export class ProductosController {
  @Get('')
  findAll() {
    // return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.categoriasService.findOne(id);
  }

  @Post('')
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    // return this.categoriasService.create(createCategoriaDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    // return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.categoriasService.remove(id);
  }
}
