import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const disableErrorMessages = !JSON.parse(process.env.DEBUG.toLocaleLowerCase());

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages }));
  app.setGlobalPrefix('api');
  app.enableCors({ origin: process.env.CORS_ORIGIN });
  await app.listen(process.env.FASTIFY_PORT || 3000, '0.0.0.0');
}
bootstrap();
