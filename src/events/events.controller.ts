import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const result = await this.eventsService.create(createEventDto);
    return {
      success: true,
      message: 'Event created successfully',
      data: { event_code: result },
    };
  }

  @Get()
  async findAll() {
    const result = await this.eventsService.findAll();
    return {
      success: true,
      message: 'Events retrieved successfully',
      data: result,
    };
  }
}
