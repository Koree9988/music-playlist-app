import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MusicPlaylistService } from './music-playlist.service';
import { CreateMusicPlaylistDto } from './dto/create-music-playlist.dto';
import { UpdateMusicPlaylistDto } from './dto/update-music-playlist.dto';
import { CreateMusicPlaylist } from './music-playlist.request';

@Controller('music-playlist')
export class MusicPlaylistController {
  constructor(private readonly musicPlaylistService: MusicPlaylistService) {}

  @Post()
  create(@Body() payload: CreateMusicPlaylist) {
    return this.musicPlaylistService.create(payload);
  }

  // @Get()
  // findAll() {
  //   return this.musicPlaylistService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.musicPlaylistService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMusicPlaylistDto: UpdateMusicPlaylistDto,
  // ) {
  //   return this.musicPlaylistService.update(+id, updateMusicPlaylistDto);
  // }

  @Delete(':playlist_id/:song_id')
  remove(
    @Param('playlist_id') playlist_id: string,
    @Param('song_id') song_id: string,
  ) {
    return this.musicPlaylistService.remove(+playlist_id, +song_id);
  }
}
