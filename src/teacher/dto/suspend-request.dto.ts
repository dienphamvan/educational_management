import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SuspendRequestDto {
  @ApiProperty()
  @IsEmail()
  student: string;
}
