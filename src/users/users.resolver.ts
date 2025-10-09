import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserInput } from './input/create-user.input';

/**
 * * Query -> GET
 * * Mutation -> POST, PUT, DELETE, PATCH
 */
@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserModel])
  async findUsersAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: CreateUserInput): Promise<string> {
    return await this.usersService.create(input);
  }
}
