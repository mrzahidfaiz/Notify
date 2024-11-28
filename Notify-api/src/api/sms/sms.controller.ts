import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { SMSService } from './sms.service';
import { SMSCreateDto } from './common/sms.create.dto';

@Controller('sms')
export class SMSController {
  constructor(private smsService: SMSService) {}
  @Get('sms')
  getHello(): string {
    return 'Route Tested to send POST Request use POST Method';
  }

  @Post('send')
  publish(@Body() data: SMSCreateDto) {
    return this.smsService.publishMessage(data);
  }

  @Post('receive')
  receive(@Request() req) {
    console.log(req.body.Body);
    console.log(req.body.From);
    console.log(req.body.SmsStatus);
  }
}
