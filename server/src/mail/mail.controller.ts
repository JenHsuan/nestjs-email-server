import { Body, Controller, Get, Post, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MockService } from 'src/mock/mock.service';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {

    constructor(
        private mailService: MailService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    sendMail(@Body() body: MailDto) {
        this.mailService.sendCustomizedMail(body);
    }

    @Post('preview')
    previewMail(@Body() body: MailDto, @Res() res: Response) {
        return res.send(this.mailService.previewCustomizedMail(body));
    }
}
