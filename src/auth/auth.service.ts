import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ){}

async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;
    const user = await this.usuariosService.findeUsuarioByEmail(email);

    console.log(user);
    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { sub: user.id, email: user.email, rol: user.rol };

    const token = await this.jwtService.signAsync(payload);

    res.cookie('access_token', token, {
      httpOnly: true, // No accesible desde JavaScript del cliente (Previene XSS)
      secure: false, // En producción debe ser true (requiere HTTPS)
      sameSite: 'lax', // Protección contra CSRF
      maxAge: 3600000, // 1 hora
    });

    return res.status(200).json({
      message: 'Autenticado correctamente',
      user: {
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
      },
    });
  }
}