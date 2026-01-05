import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfiguration } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
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
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
