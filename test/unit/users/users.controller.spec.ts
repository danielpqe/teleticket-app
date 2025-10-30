import { TestingModule, Test } from '@nestjs/testing';
import { UsersCodeMock, UsersJWTMock, UsersMock } from '../../mocks/users.mock';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { LoginService } from 'src/login/login.service';

describe('Users Controller Unit Test', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const usersServiceMock = {
      create: jest.fn().mockReturnValue(UsersCodeMock),
      findAll: jest.fn().mockReturnValue([UsersMock]),
      findCode: jest.fn().mockReturnValue(UsersMock),
    };

    const loginServiceMock = {
      login: jest.fn().mockReturnValue(UsersJWTMock),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: LoginService,
          useValue: loginServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });
  it('should controller components be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
