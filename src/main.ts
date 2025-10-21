import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'log'],
  });
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // TODO: Elimina campos no esperados
  //     forbidNonWhitelisted: true, // TODO: Lanza error si hay campos no esperados
  //   }),
  // );
  await app.listen(process.env.PORT ?? 3000);
  logger.debug(`ticketlab-app:${process.env.NODE_ENV} running 🚀`);
}
bootstrap();
