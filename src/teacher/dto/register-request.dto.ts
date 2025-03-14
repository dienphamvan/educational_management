import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @ArrayNotEmpty()
  @IsEmail(
    {},
    {
      each: true,
    },
  )
  students: string[];
}
