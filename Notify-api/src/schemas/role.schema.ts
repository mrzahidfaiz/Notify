import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class Role {
  @Prop()
  tenantId: string;
  @Prop()
  name: string;
  @Prop()
  permissions: [];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
