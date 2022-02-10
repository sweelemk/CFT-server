import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.POST || 3333;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(PORT, () => `server started on PORT: ${PORT}`);
}

start().then();
