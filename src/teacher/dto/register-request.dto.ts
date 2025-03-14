import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  teacher: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @ArrayNotEmpty()
  @IsEmail(
    {},
    {
      each: true,
    },
  )
  students: string[];
}
