import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function start() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  app.setGlobalPrefix('api');

  await app.listen(PORT, () => logger.log(`Service started on PORT: ${PORT}`));
}

start();
