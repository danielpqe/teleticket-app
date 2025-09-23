import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly commonService: CommonService,
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const user = new this.UserModel({
        ...createUserDto,
        code: this.commonService.generateCode('USR'),
        password: await this.commonService.hashPassword(createUserDto.password),
      });
      const result = await user.save();
      return result.code;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.UserModel.find({}, { password: 0 }).exec();
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.UserModel.findById(id).exec();
      if (!user) {
        throw new BadRequestException(`User with ID "${id}" not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(error.message);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error finding user');
    }
  }

  async validateLoginEmail(
    email: string,
  ): Promise<Pick<User, 'password'> | null> {
    try {
      /*
       * opcional
       * Considerar que el is_blocked !== true && max_attempts !== 0
       */

      return await this.UserModel.findOne({ email }, { password: 1 }).exec();
    } catch (err) {
      this.logger.error(err.message);
      throw new BadRequestException(err.message);
    }
  }
}
