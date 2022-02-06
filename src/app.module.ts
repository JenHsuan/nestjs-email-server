import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
//import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail/mail.service';
import { MailController } from './mail/mail.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: process.env.MAILDEV_INCOMING_USER,
          pass: process.env.MAILDEV_INCOMING_PASS,
        },
      },
      // defaults: {
      //   from: '"No Reply" <no-reply@localhost>',
      // },
      preview: true,
      // template: {
      //   dir: process.cwd() + '/template/',
      //   adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      //   options: {
      //     strict: true,
      //   },
      // },
    })
  ],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
