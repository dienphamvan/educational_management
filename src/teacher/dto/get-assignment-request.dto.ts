import { ApiProperty } from '@nestjs/swagger';
import { AssignmentStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class GetAssignmentRequestDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @ArrayNotEmpty()
  @IsEmail({}, { each: true })
  student: string[];

  @ApiProperty({
    enum: AssignmentStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(AssignmentStatus)
  status: AssignmentStatus;
}
