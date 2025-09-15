import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from 'src/login/dto/login.dto';
import { LoginService } from 'src/login/login.service';

@UsePipes(new ValidationPipe())
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
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      success: true,
      message: 'Users found successfully',
      users
    }
  }

  @Get(':code')
  async findOne(@Param('code') code: string) {
    const user = await this.usersService.findCode(code);
    return {
      success: true,
      message: 'User found successfully',
      user
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.loginService.login(loginDto)

    return {
      success: true,
      message: 'User logged successfully',
      token
    }
  }

  // TODO: Agregar el controlador para buscar por :email o :name o :code (QueryParams)
}
