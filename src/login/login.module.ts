import { Module } from '@nestjs/common';
import { LoginGuard } from './login.guard';
import { LoginMiddleware } from './login.middleware';
import { LoginService } from './login.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  exports: [LoginGuard, LoginMiddleware, LoginService],
  providers: [LoginGuard, LoginMiddleware, LoginService],
})
export class LoginModule {}
