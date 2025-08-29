import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const user = new this.UserModel({
        ...createUserDto,
        code: this.generateUserCode(),
        password: await this.hashPassword(createUserDto.password),
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
      return await this.UserModel.find().exec();
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

  private generateUserCode(): string {
    return `USR-${Math.floor(10000 + Math.random() * 900000).toString()}`;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
