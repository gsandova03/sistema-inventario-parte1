import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class RegisterDto {
  @ApiProperty({example: 'gsriv@gmail.com'})
  @IsEmail({}, { message: 'El email no es válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({example: '12345678'})
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres' })
  password: string;

  @ApiProperty({example: 'Gabriel'})
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @ApiProperty({example: 'USUARIO'})
  @IsOptional()
  rol?: string;
}