import { Injectable, Logger } from '@nestjs/common';
import { CreateLoggerDTO } from './dto/create-logger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerModel } from './schemas/logger.schema';
import { Model } from 'mongoose';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);

  constructor(
    @InjectModel(LoggerModel.name)
    private readonly loggerModel: Model<LoggerModel>,
  ) {}

  async create(createLoggerDto: CreateLoggerDTO): Promise<void> {
    try {
      const logger = new this.loggerModel(createLoggerDto);

      await logger.save();
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
