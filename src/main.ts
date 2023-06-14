import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true,
  });// Habilita o CORS

  await app.listen(3000);
}
bootstrap();
