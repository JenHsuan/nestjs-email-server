import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService
    ) { }

    public sendCustomizedMail({
        recipient,
        subject,
        text
    }: {
        recipient: string,
        subject: string,
        text: string
    }): void {
        this.mailerService
            .sendMail({
                to: recipient, // list of receivers
                from: this.configService.get<string>('MAILDEV_INCOMING_USER'), // sender address
                subject: subject, // Subject line
                html: `<b>${text}</b>`, // HTML body content
            })
            .then(res => { console.log(res)})
            .catch(err => { console.log(err)});
    }
}
