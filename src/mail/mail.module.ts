import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

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
          }),
    ],
    controllers: [MailController],
    providers: [MailService],
})
export class MailModule {}
