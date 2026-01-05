import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
  ) {}

  async register(createUserDto: CrearUsuarioDto): Promise<Usuario> {
    const { email, password, nombre } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Correo electronico no disponible');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      email,
      nombre,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    delete savedUser.password
    delete savedUser.id
    return savedUser;
  }

  async findeUsuarioByEmail(email: string): Promise<Usuario> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('No se encontro el usuario');
    }
    return user;
  }
}
