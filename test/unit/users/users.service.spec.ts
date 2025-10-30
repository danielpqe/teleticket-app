import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { UserModelMock } from 'test/mocks/users.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { after } from 'node:test';

// Because of the private method createdAt using bcrypt
jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;

describe('Users Service Unit Test', () => {
  let service: UsersService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const userModelMock = jest.fn().mockImplementation(() => ({
      ...UserModelMock,
      save: jest.fn().mockResolvedValue(UserModelMock),
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get(getModelToken(User.name));

    // ! revisar esto
    bcryptMock.genSalt.mockResolvedValue('salt');
    bcryptMock.hash.mockResolvedValue('hashedPassword');
  });

  after(() => {
    jest.clearAllMocks();
  });
});
