import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { EventsService } from 'src/events/events.service';
import { CommonService } from 'src/common/common.service';
import { Event } from 'src/events/entities/event.entity';
import { EventCodeMock, EventDTOMock, EventsMock } from './../../mocks/events.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Events Service Test Unit', () => {
  let service: EventsService;
  let commonService: CommonService;
  let eventRepository: Repository<Event>

  beforeEach(async () => {
    const eventRepositoryMock = {
      save: jest.fn().mockResolvedValue(EventsMock),
      find: jest.fn().mockResolvedValue([EventsMock]),
      findOne: jest.fn().mockResolvedValue(EventsMock),
      create: jest.fn().mockReturnValue(EventsMock)
    };

    const commonServiceMock = {
      generateCode: jest.fn().mockReturnValue(EventCodeMock)
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: CommonService,
          useValue: commonServiceMock
        },
        {
          provide: getRepositoryToken(Event),
          useValue: eventRepositoryMock
        }
      ]
    }).compile();

    service = module.get<EventsService>(EventsService);
    commonService = module.get<CommonService>(CommonService);
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should service components be defined', () => {
    expect(service).toBeDefined();
    expect(commonService).toBeDefined();
    expect(eventRepository).toBeDefined();
  });

  it('should create a new event', async () => {
    const result = await service.create(EventDTOMock, 'gian.munoz@ticketlab.com')
    expect(result).toEqual(EventCodeMock);
  });

  //TODO: Agregar test findAll y findCode.
})