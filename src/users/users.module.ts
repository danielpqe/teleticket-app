import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { CommonService } from '../common/common.service';
import { UsersResolver } from './users.resolver';
import { LoginService } from '../login/login.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, CommonService, LoginService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
