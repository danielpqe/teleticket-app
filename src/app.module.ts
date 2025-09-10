import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common/common.service';
import { LoginModule } from './login/login.module';

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
  ],
  controllers: [],
  providers: [CommonService],
})
export class AppModule {}
