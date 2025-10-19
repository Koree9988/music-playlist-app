/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetMusicReq {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  name?: string;

  //   @ApiProperty({ type: String, required: false })
  //   @IsString()
  //   duaration?: number;
  @ApiProperty({ type: String, required: false })
  @IsString()
  artist?: string;
}
