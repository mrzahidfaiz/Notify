import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { defaultTenantRole } from 'src/api/tenant/dto/default-tenant-roles';

@Schema({
  timestamps: true,
})
export class Tenant {
  @Prop()
  company_name: string;

  @Prop({ type: String, lowercase: true, trim: true })
  email: string;

  @Prop()
  password: string;

  @Prop({default: [defaultTenantRole]})
  roles: [];

}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
