import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CrearCategoriaDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio' })
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  activa?: boolean;
}