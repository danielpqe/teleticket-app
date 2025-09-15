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
  constructor(private readonly userService: UsersService) {}

  @Query(() => [UserModel])
  async findUsersAll(): Promise<User[]> {
    console.log('findUsersAll');
    return await this.userService.findAll();
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: CreateUserInput): Promise<string> {
    console.log('input: ', input);
    return await this.userService.create(input);
  }

  //TODO: Agregar @Query() del findCode()
}
