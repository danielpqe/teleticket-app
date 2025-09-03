import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as UUIDv4 } from 'uuid';

export type UserDocument = User & Document;

// TODO: Agregar campo de eliminacion logica
@Schema({ versionKey: false })
export class User {
  @Prop({ type: String, default: UUIDv4, select: false })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  // TODO: Refactor to validate JWT
  @Prop({ required: true, select: false })
  password: string;

  @Prop({ unique: true })
  code: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: () => new Date() })
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
