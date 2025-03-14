import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RetrieveNotificationsDto {
  @ApiProperty()
  @IsEmail()
  teacher: string;

  @ApiProperty()
  @IsString()
  notification: string;
}
