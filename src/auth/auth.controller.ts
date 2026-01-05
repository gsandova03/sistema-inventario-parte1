import { Body, Controller, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { Response } from 'express';
import { Roles } from './decorators/roles.decorator';
import { TipoUsuario } from 'src/usuarios/usuario.entity';

@Controller('auth')
export class AuthController {


  constructor(
    private readonly userService: UsuariosService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  profile(@GetUser() user: any) {
    return user;
  }

  @Get('users')
  @Roles(TipoUsuario.ADMIN)
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.userService.findAll();
  }

  @Patch('users/:id/role')
  @Roles(TipoUsuario.ADMIN)
  @UseGuards(JwtAuthGuard)
  updateRole(@Param('id') id: number, @Body('rol') rol: TipoUsuario) {
    return this.userService.updateRole(id, { rol });
  }
}
