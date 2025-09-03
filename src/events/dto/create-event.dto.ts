import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description: string;

  @IsString()
  @IsOptional()
  start_date: Date;

  @IsString()
  @IsOptional()
  end_date: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  ticket_price: number;

  @IsString()
  @IsNotEmpty()
  event_type: string;

  @IsString()
  @IsNotEmpty()
  event_category: string;
}
