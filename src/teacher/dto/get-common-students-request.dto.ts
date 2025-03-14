import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsEmail } from 'class-validator';

export class GetCommonStudentsRequestDto {
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
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  teacher: string[];
}
