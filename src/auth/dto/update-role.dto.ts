import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { TipoUsuario } from "src/usuarios/usuario.entity";

export class UpdateRoleDto {
  @ApiProperty({example: 'USUARIO'})
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  rol: TipoUsuario;
}