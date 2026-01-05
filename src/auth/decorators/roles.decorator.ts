import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from 'src/usuarios/usuario.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TipoUsuario[]) => SetMetadata(ROLES_KEY, roles);
