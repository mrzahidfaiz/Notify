import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WHATSAPP',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'whatsapp-microservice',
            brokers: ['localhost:9092'],
          },
          // consumer: {
          //   groupId: 'whatsapp-consumer',
          // },
        },
      },
    ]),
  ],
  providers: [WhatsappService],
  controllers: [WhatsappController],
})
export class WhatsappModule {}
