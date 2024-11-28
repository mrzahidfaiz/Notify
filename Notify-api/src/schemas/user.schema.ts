import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
import { Role } from './role.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  tenantId: string;
  @Prop()
  name: string;
  @Prop({ type: String, lowercase: true, trim: true })
  email: string;
  @Prop()
  password: string;
  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: Role.name }] })
  roles: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
