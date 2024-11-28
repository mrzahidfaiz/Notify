import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { WhatsappModule } from './api/whatsapp/whatsapp.module';
import { SmsModule } from './api/sms/sms.module';
import { TenantModule } from './api/tenant/tenant.module';
import { UsersModule } from './api/users/users.module';
import { RolesModule } from './api/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    TenantModule,
    AuthModule,
    WhatsappModule,
    SmsModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
