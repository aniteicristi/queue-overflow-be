import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));
  app.enableCors({
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
    credentials: false,
  });
  await app.listen(8000);
}
bootstrap();
