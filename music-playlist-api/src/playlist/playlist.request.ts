/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetAllPlaylist {
  //   @ApiProperty({ type: String, required: false })
  //   @IsString()
  //   @IsOptional()
  //   title?: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  user_id: number;
}

export class CreatePlaylist {
  @ApiProperty({ type: String, required: true })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  user_id: number;
}

export class PatchPlaylist {
  @ApiProperty({ type: String, required: true })
  @IsString()
  name: string;
}
