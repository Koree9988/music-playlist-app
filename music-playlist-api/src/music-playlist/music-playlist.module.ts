import { Module } from '@nestjs/common';
import { MusicPlaylistService } from './music-playlist.service';
import { MusicPlaylistController } from './music-playlist.controller';

@Module({
  controllers: [MusicPlaylistController],
  providers: [MusicPlaylistService],
})
export class MusicPlaylistModule {}
