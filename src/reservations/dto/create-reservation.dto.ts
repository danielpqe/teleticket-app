import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  /**
   * Validate format of event_code
   * 1. Validations should be part of the dto
   */
  @IsOptional()
  @IsString()
  event_code: string;

  @IsNotEmpty()
  @IsString()
  event: string;
}
