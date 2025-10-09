import { MiddlewareConsumer, Module } from '@nestjs/common';
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
// import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/teleticket-app'),
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'teleticket_db',
      autoLoadEntities: true,
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // Debe ser true solo en desarrollo
    }),
    LoginModule,
    JwtModule.register({
      global: true,
      secret: 'My_secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    ReservationsModule,
    KafkaModule,
    // GraphqlModule,
  ],
  controllers: [],
  providers: [CommonService],
})
export class AppModule {
  constructor(private readonly loginMiddleware: LoginMiddleware) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(this.loginMiddleware.use.bind(this.loginMiddleware))
      .forRoutes(EventsController, ReservationsController);
  }
}
