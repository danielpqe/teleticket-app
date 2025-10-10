import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  /**
   * Validate format of event_code
   * 1. Validations should be part of the dto
   * 2. Otra categoria de validaciones se puede hacer en el service
   */
  @IsNotEmpty()
  @IsString()
  event_code: string;

  event: string;
}
