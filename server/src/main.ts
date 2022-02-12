import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import { MailModule } from './mail/mail.module';
import { ValidationPipe } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { MockModule } from './mock/mock.module';
import { AuthModule } from './auth/auth.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'views'));


  app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

  const options = new DocumentBuilder()
    .setTitle('API documents')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [
      AppModule,
      MailModule,
      MockModule,
      AuthModule
    ],
  });
  SwaggerModule.setup('docs', app, document);
  await app.listen(8000);
}
bootstrap();
