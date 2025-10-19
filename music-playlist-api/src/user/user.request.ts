/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  password: string;
}
