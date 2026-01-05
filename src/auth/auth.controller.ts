import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
// import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

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
  login(@Body() loginDto: LoginDto) {
    // return this.authService.login(loginDto);
  }

  @Get('profile')
  // @UseGuards(JwtAuthGuard)
  profile(@Req() req: Request) {
    // return this.authService.profile(req);
  }
}
