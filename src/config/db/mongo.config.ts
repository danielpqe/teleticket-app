import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
});

const configService = new ConfigService();

export const MongoConfig: string = `${configService.get<string>('MONGO_URI')}${configService.get<string>('MONGO_DBNAME')}`;
