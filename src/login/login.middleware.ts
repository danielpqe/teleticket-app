import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(LoginMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  // TODO: Refactorizar métido.
  async use(req: Request, res: Response, next: () => void) {
    const request = req.headers['authorization'];
    const token = request ? request.split(' ')[1] : null;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const tokenValidate: { email: string } =
        await this.jwtService.verifyAsync(token, {
          secret: 'My_secret',
        });

      req['user'] = tokenValidate.email;
    } catch (e) {
      this.logger.error('Token invalid ', e.message);
      throw new UnauthorizedException(`Token invalid: ${e.message}`);
    }

    next();
  }
}
