import { Module } from '@nestjs/common';
import { SMSService } from './sms.service';
import { SMSController } from './sms.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SMS',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'sms-microservice',
            brokers: ['localhost:9092'],
          },
          // consumer: {
          //   groupId: 'sms-consumer',
          // },
        },
      },
    ]),
  ],
  providers: [SMSService],
  controllers: [SMSController],
})
export class SmsModule {}
