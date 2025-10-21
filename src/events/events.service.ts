import { Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly commonService: CommonService,
  ) {}

  async create(createEventDto: CreateEventDto, user: string): Promise<string> {
    try {
      const event = this.eventRepository.create({
        ...createEventDto,
        event_code: this.commonService.generateCode('EVN'),
        created_user: user,
      });
      const result = await this.eventRepository.save(event);
      return result.event_code;
    } catch (error) {
      this.logger.error('Error creating event', error.message);
      throw new Error('Error creating event');
    }
  }

  async findAll(): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        select: [
          'name',
          'description',
          'location',
          'ticket_price',
          'event_type',
          'category',
          'event_code',
          'event_status',
          'status',
          'created_user',
          'updated_user',
          'created_at',
          'updated_at',
        ],
      });
    } catch (error) {
      this.logger.error('Error finding events', error.message);
      throw new Error('Error finding events');
    }
  }

  async findByCode(event_code: string): Promise<Event> {
    try {
      const event = await this.eventRepository.findOne({
        where: { event_code },
        select: [
          'name',
          'description',
          'location',
          'ticket_price',
          'event_type',
          'category',
          'event_code',
          'event_status',
          'status',
          'created_user',
          'updated_user',
          'created_at',
          'updated_at',
        ],
        relations: ['reservations'],
      });
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    } catch (error) {
      this.logger.error('Error finding event by code', error.message);
      throw new Error('Error finding event by code');
    }
  }
}
