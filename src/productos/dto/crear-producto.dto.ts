import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsInt, Min, IsPositive, IsOptional } from 'class-validator';

export class CrearProductoDto {
  @ApiProperty({ example: 'Nombre del producto', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  nombre: string;

  @ApiProperty({ example: 'Descripción del producto', description: 'Descripción del producto' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: 10, description: 'Precio del producto' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número con máximo 2 decimales' })
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio: number;

  @ApiProperty({ example: 100, description: 'Cantidad en stock del producto' })
  @IsInt({ message: 'El stock debe ser un número entero' })
  @IsPositive({ message: 'El stock debe ser mayor a 0' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @ApiProperty({ example: 1, description: 'Id de la categoría del producto' })
  @IsInt()
  @IsNotEmpty({ message: 'El id de categoría es obligatorio' })
  categoria_id: number;
}