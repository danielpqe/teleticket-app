import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

// TODO: Agregar campo de eliminación lógica
@Schema({ versionKey: false })
export class User {
  @Prop({
    type: String,
    default: uuidv4,
    select: false,
  })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ unique: true })
  code: string;

  @Prop({ default: () => true })
  status: boolean;

  @Prop({ default: () => new Date() })
  created_at: Date;

  @Prop()
  updated_at: Date;

  /*
  * optional
  @Prop({ default: 3 })
  max_attempts: number

  @Prop({ default: false })
  is_blocked: boolean 

  * provider: ['manual', 'google', 'facebook', 'githhub'] -> Strategy
  * token_app: string
  */
}

export const UserSchema = SchemaFactory.createForClass(User);
