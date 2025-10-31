import { EventsController } from 'src/events/events.controller';
import { EventsService } from 'src/events/events.service';
import { EventCodeMock, EventsMock } from '../../mocks/events.mock';
import { Test, TestingModule } from '@nestjs/testing';

describe('Events Controller Test Unit', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const eventsServiceMock = {
      create: jest.fn().mockReturnValue(EventCodeMock),
      findAll: jest.fn().mockReturnValue([EventsMock]),
      findCode: jest.fn().mockReturnValue(EventsMock),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: eventsServiceMock,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    controller = module.get<EventsController>(EventsController);
  });

  it('should controller components be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
