import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Standard } from '../templates/Standard';
import { MailDto } from '../mail/dto/mail.dto';
import { render } from 'mjml-react';
@Injectable()
export class MockService {
    constructor(private configService: ConfigService) { }
    private mockedDta: MailDto = {
        recipient: this.configService.get<string>('MOCKED_RECIPIENTS'),
        subject: 'Daily Learning Newpaper',
        title: 'Daily Learning Newpaper',
        text: `There are several things we need to set for building a new Next.js project. There is a new way that we only have to do it once
        For example, we have to re-create files and settings for Redux, Redux middleware, Styled-components again and again if we need them. Sometimes, we may also need extra things like setting Jest, Enor using TypeScript.`,
        logo: 'https://raw.githubusercontent.com/JenHsuan/ALayman/master/views/images/alaymanicon.png',
        btnText: 'Daily-Learing website',
        link: 'https://daily-learning.herokuapp.com/',
        footer: {
            blog: 'https://medium.com/a-layman',
            facebook: 'https://www.facebook.com/imalayman'
        }
    }

    get template() {
        return render(Standard(this.mockedDta), { validationLevel: 'soft' }).html;
    }
}
