/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateMusicPlaylist {
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  playlist_id?: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  user_id: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  music_id: number;
}

export class DeleteMusicFromPlaylist {
  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  playlist_id: number;

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  music_id: number;
}
