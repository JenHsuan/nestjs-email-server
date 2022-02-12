import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import { MailModule } from './mail/mail.module';
import { ValidationPipe } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { MockModule } from './mock/mock.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('API documents')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [
      MailModule,
      MockModule,
      AuthModule
    ],
  });
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
