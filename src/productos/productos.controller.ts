import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { TipoUsuario } from 'src/usuarios/usuario.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { LowStockQueryDto } from './dto/low-stock-query.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get('')
  findAll() {
    return this.productosService.findAll();
  }

  @Get('low-stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADMIN)
  getLowStock(@Query('threshold') threshold: LowStockQueryDto) {
    return this.productosService.findLowStockProducts(threshold.threshold);
  }

    // Parte 2 endpoints

  @Get('my-products')
  @UseGuards(JwtAuthGuard)
  getMyProducts(@GetUser() user: any) {
    return this.productosService.findMyProducts(user.userId);
  }

  @Put(':id/stock')
  @UseGuards(JwtAuthGuard)
  updateStock(
    @Param('id') id: number,
    @Body('stock', ParseIntPipe) stock: number,
    @GetUser() user: any,
  ) {
    return this.productosService.updateStock(id, stock, user);
  }

  
  @Post('')
  @UseGuards(JwtAuthGuard)
  create(@Body() CrearProductoDto: CrearProductoDto, @GetUser() user: any) {
    return this.productosService.create(CrearProductoDto, user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() ActualizarProductoDto: ActualizarProductoDto, @GetUser() user: any) {
    return this.productosService.update(id, ActualizarProductoDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number, @GetUser() user: any) {
    return this.productosService.remove(id, user.userId);
  }
}
