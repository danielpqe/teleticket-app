import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { CommonService } from 'src/common/common.service';
import { Event } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Event])],
  controllers: [ReservationsController],
  providers: [ReservationsService, CommonService],
})
export class ReservationsModule {}
