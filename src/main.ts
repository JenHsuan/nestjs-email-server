import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MailModule } from './mail/mail.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Mail example')
    .setDescription('The mail API description')
    .setVersion('1.0')
    .addTag('mail')
    .build();

  const catDocument = SwaggerModule.createDocument(app, options, {
    include: [MailModule],
  });
  SwaggerModule.setup('api/mail', app, catDocument);
  await app.listen(3000);
}
bootstrap();
