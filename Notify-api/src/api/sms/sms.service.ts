import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { createMessageEvent } from './common/sms.createsms.event';
import { SMSCreateDto } from './common/sms.create.dto';

@Injectable()
export class SMSService {
  constructor(@Inject('SMS') private readonly kafkaClient: ClientKafka) {}

  publishMessage({ recipient, message }: SMSCreateDto) {
    return this.kafkaClient.emit(
      'publish_message',
      new createMessageEvent(recipient, message),
    );
  }
}
