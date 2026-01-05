import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUsuario, Usuario } from 'src/usuarios/usuario.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ){}


  async runseed() {
    const clave = await bcrypt.hash('Admin123', 10);
    const admin = this.usuarioRepository.create({
      nombre: 'Administrador Sistema',
      email: 'admin@admin.com',
      password: clave,
      rol: TipoUsuario.ADMIN,
    });
  
    await this.usuarioRepository.save(admin);

    return "Seed completada";
  }
}
