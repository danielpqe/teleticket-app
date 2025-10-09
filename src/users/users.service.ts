import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CommonService } from '../common/common.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly commonService: CommonService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const user = new this.userModel({
        ...createUserDto,
        code: this.commonService.generateCode('USR'),
        password: await this.commonService.hashPassword(createUserDto.password),
      });

      const result = await user.save();
      return result.code;
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException(err.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find({}, { password: 0 }).exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findCode(code: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ code }).exec();
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException(err.message);
    }
  }

  //* Este método no esta expuesto en una ruta (Controller)
  async validateLoginEmail(
    email: string,
  ): Promise<Pick<User, 'password'> | null> {
    try {
      /*
       * opcional
       * Considerar que el is_blocked !== true && max_attempts !== 0
       */

      return await this.userModel.findOne({ email }, { password: 1 }).exec();
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException(err.message);
    }
  }
}
