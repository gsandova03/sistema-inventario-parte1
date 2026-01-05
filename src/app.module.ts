import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfiguration } from './config/env.config';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: EnvConfiguration().dbHost,
      port: EnvConfiguration().dbPort as unknown as number,
      username: EnvConfiguration().dbUsername,
      password: EnvConfiguration().dbPassword,
      database: EnvConfiguration().dbName,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriasModule,
    ProductosModule,
    UsuariosModule,
    AuthModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
