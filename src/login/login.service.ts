import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  private readonly logger: Logger = new Logger(LoginService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<string> {
    try {
      const user = await this.usersService.validateLoginEmail(email);
      if (!user) {
        throw 'User not found with email: ' + email;
      }

      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        /*
         * opcional
         * Restar un intento de inicio de sesión.
         * Si los intentos de sesión es 0 (cero) bloquear el login.
         * Si is_blocked === true enviar un evento a un ms para mantener bloqueado la cuenta por XX tiempo.
         */
        throw `Password does not match user: ${email}`;
      }

      const payload = {
        email,
      };

      return await this.jwtService.signAsync(payload); //retorna token
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException(err);
    }
  }
}
