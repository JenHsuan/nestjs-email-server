import { Body, Controller, Post } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {

    constructor(private mailService: MailService){}
    @Post()
    sendMail(@Body() body: MailDto) {
        this.mailService.sendCustomizedMail(body);
    }
}
