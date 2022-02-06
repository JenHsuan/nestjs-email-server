import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {

    constructor(private mailService: MailService){}
    @Post()
    sendMail(@Body() body) {
        const {subject, recipient, text} = body;
        this.mailService.sendCustomizedMail({ subject, recipient, text })
    }
}
