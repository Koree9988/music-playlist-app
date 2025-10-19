import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UpdateMusicPlaylistDto } from './dto/update-music-playlist.dto';
import { CreateMusicPlaylist } from './music-playlist.request';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class MusicPlaylistService {
  constructor(private readonly prisma: PrismaService) {}
  async create(payload: CreateMusicPlaylist) {
    try {
      const music = await this.prisma.music.findUnique({
        where: { id: payload.music_id },
      });
      if (!music) return null;
      if (!payload.playlist_id) {
        const playlist = await this.prisma.playlist.create({
          data: {
            user_id: payload.user_id,
            name: music.title,
          },
        });
        const musicPlaylist = this.prisma.playlistMusic.create({
          data: { playlistId: playlist.id, musicId: music.id },
        });
        return musicPlaylist;
      }
      const musicPlaylist = this.prisma.playlistMusic.create({
        data: { playlistId: payload.playlist_id, musicId: payload.music_id },
      });
      return musicPlaylist;
    } catch (error) {
      return null;
    }
  }

  // findAll() {
  //   return `This action returns all musicPlaylist`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} musicPlaylist`;
  // }

  // update(id: number, updateMusicPlaylistDto: UpdateMusicPlaylistDto) {
  //   return `This action updates a #${id} musicPlaylist`;
  // }

  async remove(pId: number, sId: number) {
    try {
      const plalistStm = this.prisma.playlist.findUnique({
        where: { id: pId },
      });
      const songStm = this.prisma.music.findUnique({ where: { id: sId } });
      const [playlist, song] = await Promise.all([plalistStm, songStm]);
      if (!playlist || !song)
        throw new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Invalid input ID.',
          details: ['Check your playlistId', 'Check your musicId'],
        });

      const del = await this.prisma.playlistMusic.delete({
        where: {
          playlistId_musicId: {
            playlistId: pId,
            musicId: sId,
          },
        },
      });

      return del;
    } catch (error) {
      return null;
    }
  }
}
