import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import {
  CreatePlaylist,
  GetAllPlaylist,
  PatchPlaylist,
} from './playlist.request';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylist) {
    return this.playlistService.create(createPlaylistDto);
  }

  @Get()
  findAll(@Query() payload: GetAllPlaylist) {
    return this.playlistService.findAll(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: PatchPlaylist) {
    return this.playlistService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }
}
