import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginService } from 'src/login/login.service';
import { LoginDto } from 'src/login/dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginService: LoginService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return {
      success: true,
      message: 'User created successfully',
      data: {
        user_code: result,
      },
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      success: true,
      message: 'User retrieved successfully',
      data: {
        user_code: user._id,
      },
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.loginService.login(loginDto);
    return {
      success: true,
      message: 'Login successful',
      token: data,
    };
  }
}
