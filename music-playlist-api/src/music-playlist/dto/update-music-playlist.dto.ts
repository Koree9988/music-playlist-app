import { PartialType } from '@nestjs/swagger';
import { CreateMusicPlaylistDto } from './create-music-playlist.dto';

export class UpdateMusicPlaylistDto extends PartialType(CreateMusicPlaylistDto) {}
