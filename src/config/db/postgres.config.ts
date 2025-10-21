import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV || 'dev'}` });

const configService = new ConfigService();

export const PostgresConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'postgres'),
  database: configService.get<string>('DB_NAME', 'teleticket_db'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true, // Debe ser true solo en desarrollo
  namingStrategy: new SnakeNamingStrategy(),
  poolErrorHandler: (error: Error) => {
    console.error('Unexpected error on idle client', error);
    process.exit(-1);
  },
};
