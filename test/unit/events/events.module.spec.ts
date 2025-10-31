import { Test, TestingModule } from '@nestjs/testing';
import { EventsModule } from 'src/events/events.module';

describe('Events Module Test Unit', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [EventsModule]
    }).compile();
  });

  afterEach(() => {
    module.close();
  });

  it('should module components be defined', () => {
    expect(module).toBeDefined();
  });
})