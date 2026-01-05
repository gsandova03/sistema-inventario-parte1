import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @ApiProperty({example: 'gsriv@gmail.com'})
  @IsEmail({}, { message: 'El email no es válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;


  @ApiProperty({example: '12345678'})
  @IsNotEmpty()
  @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres' })
  password: string;

}