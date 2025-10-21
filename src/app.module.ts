import { Logger, MiddlewareConsumer, Module, Post } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common/common.service';
import { LoginModule } from './login/login.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ReservationsModule } from './reservations/reservations.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginMiddleware } from './login/login.middleware';
import { EventsController } from './events/events.controller';
import { ReservationsController } from './reservations/reservations.controller';
import { KafkaModule } from './kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfig } from './config/db/postgres.config';
import { MongoConfig } from './config/db/mongo.config';
import { JwtConfig } from './config/jwt/jwt.config';
// import { GraphqlModule } from './graphql/graphql.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(MongoConfig),
    EventsModule,
    TypeOrmModule.forRoot(PostgresConfig),
    LoginModule,
    JwtModule.register(JwtConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    ReservationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    KafkaModule,
    LoggerModule,
    // GraphqlModule,
  ],
  controllers: [],
  providers: [CommonService, LoggerMiddleware],
})
export class AppModule {
  constructor(
    private readonly loginMiddleware: LoginMiddleware,
    private readonly loggerMiddleware: LoggerMiddleware,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(this.loggerMiddleware.use.bind(this.loggerMiddleware))
      .forRoutes('*');

    consumer
      .apply(this.loginMiddleware.use.bind(this.loginMiddleware))
      .forRoutes(EventsController, ReservationsController);
  }
}
