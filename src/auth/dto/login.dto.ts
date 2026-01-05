import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @IsEmail({}, { message: 'El email no es válido' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;


  @IsNotEmpty()
  @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres' })
  password: string;

}