import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CrearCategoriaDto {
  @ApiProperty({ example: 'Nombre de la categoría', description: 'Nombre de la categoría' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio' })
  nombre: string;

  @ApiProperty({ example: 'Descripción de la categoría', description: 'Descripción de la categoría', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: true, description: 'Si la categoría está activa o no', required: false })
  @IsBoolean()
  @IsOptional()
  activa?: boolean;
}