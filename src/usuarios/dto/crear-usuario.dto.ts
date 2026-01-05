import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { TipoUsuario } from '../usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CrearUsuarioDto {
  @IsEmail({}, { message: 'El formato del correo es inválido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;
}