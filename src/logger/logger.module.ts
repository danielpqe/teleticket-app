import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModel, LoggerSchema } from './schemas/logger.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LoggerModel.name, schema: LoggerSchema },
    ]),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
