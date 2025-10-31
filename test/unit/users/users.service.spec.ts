import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CommonService } from 'src/common/common.service';
import {
  UsersCodeMock,
  UserDTOMock,
  UsersJWTMock,
  UserModelMock,
} from './../../mocks/users.mock';

describe('Users Service Test Unit', () => {
  let service: UsersService;
  let commonService: CommonService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const userModelMock = jest.fn().mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(UserModelMock),
    }));

    (userModelMock as any).find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([UserModelMock]),
    });

    (userModelMock as any).findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(UserModelMock),
    });

    const commonServiceMock = {
      generateCode: jest.fn().mockReturnValue(UsersCodeMock),
      hashPassword: jest.fn().mockReturnValue(UsersJWTMock),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModelMock,
        },
        {
          provide: CommonService,
          useValue: commonServiceMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    commonService = module.get<CommonService>(CommonService);
    model = module.get(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should service components be defined', () => {
    expect(service).toBeDefined();
    expect(commonService).toBeDefined();
    expect(model).toBeDefined();
  });

  it('should create a new user', async () => {
    const result = await service.create(UserDTOMock);
    expect(result).toEqual(UsersCodeMock);
  });

  it('should find all users', async () => {
    const result = await service.findAll();
    expect(result).toEqual([UserModelMock]);
  });

  it('should find a user by code', async () => {
    const result = await service.findCode(UsersCodeMock);
    expect(result).toEqual(UserModelMock);
    expect(model.findOne).toHaveBeenCalled();
  });

  // TODO: Agregar test validateLoginEmail
});
