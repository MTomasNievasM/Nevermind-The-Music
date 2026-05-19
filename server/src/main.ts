import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para que Next.js (puerto 3000) pueda pedir datos
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // El backend correrá en el puerto configurado o 3001 para no pisar a Next.js
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
