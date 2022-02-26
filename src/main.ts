import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const disableErrorMessages = !JSON.parse(process.env.DEBUG.toLocaleLowerCase());

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages }));
  app.setGlobalPrefix('api');
  app.enableCors({ origin: process.env.CORS_ORIGIN });

  const config = new DocumentBuilder()
  .setTitle('IST API Docs')
  .setVersion('1.0')
  .addTag('ist')
  .build();

  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.FASTIFY_PORT || 3000, '0.0.0.0');
}
bootstrap();
