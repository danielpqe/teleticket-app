import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type LoggerDocument = LoggerModel & Document;

@Schema({ versionKey: false })
export class LoggerModel {
  @Prop({
    type: String,
    default: uuidv4,
    select: false
  })
  _id: string;

  @Prop()
  logger_id: string;

  @Prop()
  request_detail: string;
}

export const LoggerSchema = SchemaFactory.createForClass(LoggerModel);
