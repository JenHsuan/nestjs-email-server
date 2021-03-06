import { MailerService } from '@nestjs-modules/mailer';
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Standard } from 'src/templates/Standard';
import { MailDto } from './dto/mail.dto';
import { render } from 'mjml-react';

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private configService: ConfigService
    ) { }

    public sendCustomizedMail(mailDto: MailDto): void {
        this.mailerService
            .sendMail({
                to: mailDto.recipient, // list of receivers
                from: this.configService.get<string>('MAILDEV_INCOMING_USER'), // sender address
                subject: mailDto.subject, // Subject line
                html: render(Standard(mailDto), { validationLevel: 'soft' }).html
            })
            .then(res => {
                console.log('send email success', res);
            })
            .catch(err => {
                console.log('send email failed', err);
            });
    }

    public previewCustomizedMail(mailDto: MailDto): string {
        return render(Standard(mailDto), { validationLevel: 'soft' }).html;
    }
}
