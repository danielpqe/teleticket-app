import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class ReservationsService {
  private readonly logger: Logger = new Logger(ReservationsService.name);

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly commonService: CommonService,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    email: string,
  ): Promise<string> {
    try {
      const reservation = this.reservationRepository.create({
        event_code: createReservationDto.event_code,
        reservation_code: this.commonService.generateCode('RES'),
        created_user: email,
      });

      const result = await this.reservationRepository.save(reservation);

      return result.reservation_code;
    } catch (e) {
      this.logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}
