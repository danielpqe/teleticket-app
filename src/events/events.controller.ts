import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { LoginGuard } from 'src/login/login.guard';
import e from 'express';

@Controller('events')
@UseGuards(LoginGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    const emailUser = req['user'] ?? 'unknown';
    const result = await this.eventsService.create(createEventDto, emailUser);
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

  @Get(':event_code')
  async findByCode(@Param('event_code') event_code: string) {
    const result = await this.eventsService.findByCode(event_code);
    return {
      success: true,
      message: 'Event retrieved successfully',
      data: result,
    };
  }
}
