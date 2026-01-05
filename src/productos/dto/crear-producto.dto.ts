import { IsString, IsNotEmpty, IsNumber, IsInt, Min, IsPositive, IsOptional } from 'class-validator';

export class CrearProductoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número con máximo 2 decimales' })
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @IsInt()
  @IsNotEmpty({ message: 'El id de categoría es obligatorio' })
  categoria_id: number;
}