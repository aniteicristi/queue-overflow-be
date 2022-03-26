import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

console.log(process.env.MAILGUN_API_USER);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));
  app.enableCors({
    methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  });
  await app.listen(8000);
}
bootstrap();
