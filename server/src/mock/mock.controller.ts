import { Controller, Get, Res } from '@nestjs/common';
import { MockService } from './mock.service';
import { Response } from 'express';

@Controller('mock')
export class MockController {
    constructor(private mockService:MockService){}
    @Get('standard')
    preview(@Res() res: Response) {
        return res.send(this.mockService.template)
    }
}
