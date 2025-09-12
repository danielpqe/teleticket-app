import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { GetEmailUser } from 'src/common/common.decorator';

@UsePipes(new ValidationPipe())
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @GetEmailUser() email: string,
  ) {
    const result = await this.reservationsService.create(
      createReservationDto,
      email,
    );
    return {
      success: true,
      message: 'reservation created successfully',
      data: {
        reservation_code: result,
      },
    };
  }
}
