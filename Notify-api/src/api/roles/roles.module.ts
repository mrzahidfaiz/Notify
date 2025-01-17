import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from 'src/schemas/role.schema';
import { RolesService } from './roles.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],

  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
