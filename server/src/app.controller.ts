import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  edit(@Res() res: Response) {
      return res.render('index.html')
  }
}
