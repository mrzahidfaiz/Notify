import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { MessageDto } from './common/message.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private whatsappService: WhatsappService) {}

  @Get()
  getHello() {
    return 'whatsapp';
  }
  @Post('send')
  publish(@Body() data: MessageDto) {
    return this.whatsappService.publishMessage(data);
  }
  @Post('receive')
  receive(@Request() req) {
    console.log(req.body.Body);
    console.log(req.body.From);
    console.log(req.body.SmsStatus);
  }

  @Post('status')
  messageStatus(@Request() req) {
    console.log(req.body.SmsStatus);
  }
}
