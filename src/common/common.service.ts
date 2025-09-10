import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommonService {
  generateCode(prefix: string): string {
    return `${prefix}-${Math.floor(10000 + Math.random() * 900000).toString()}`;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
