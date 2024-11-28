import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PublishMessageEvent } from './common/message.publish.event';

@Injectable()
export class WhatsappService {
  constructor(
    @Inject('WHATSAPP') private kafkaClient: ClientKafka,
  ) {}

  publishMessage({ recipient, message }) {
    return this.kafkaClient.emit(
      'publish_whatsapp',
      new PublishMessageEvent(recipient, message),
    );
  }
}
