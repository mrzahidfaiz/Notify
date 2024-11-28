import { Injectable } from '@nestjs/common';
import { HandleMessageEvent } from './common/handle-message.event';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World';
  }

  async handleMessage(handleMessage: HandleMessageEvent) {

    const { recipient, message } = handleMessage;
    const from = process.env.TWILIO_PHONE_NO

    const Twilio = require('twilio')(process.env.TOKEN_SID, process.env.TOKEN_SECRET);

    const response = await Twilio.messages
      .create({
        from,
        to: recipient,
        body: message,
      })
    // .then((message: any) => console.log(`Message send with SID ${message.sid}`))
    // .catch((error: any) => console.log(`Error while send message ${error}`))
    console.log(response.sid);
    return response;
  }
}
