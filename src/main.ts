import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Sistema de inventario')
    .setDescription('API de prueba')
    .setVersion('1.0')
    .addTag('prueba')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Content-Type', 'Authorization']
  });
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
