import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  /**
   * Validate format of event_code
   * 1. Validations should be part of the dto
   */
  @IsNotEmpty()
  @IsString()
  event_code: string;
}
