import { Injectable } from '@nestjs/common';
import { HandleMessageEvent } from './common/handle.message.event';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  async handlePublishMessage(handleMessageEvent: HandleMessageEvent) {

    const { recipient, message } = handleMessageEvent;
    try {

      const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

      const response = await client.messages
        .create({
          to: `whatsapp:${recipient}`,
          from: process.env.TWILIO_PHONE_NO,
          body: message,
          StatusCallback: "http://localhost:4000/whatsapp/status"
        })
        // .then(message => console.log(message.sid))
        // .catch(error => console.log(error))

        console.log(response.sid);

        return response;
    } catch (error) {
      console.log(error)
    }

  }
}
