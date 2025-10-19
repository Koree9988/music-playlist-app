import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import {
  CreatePlaylist,
  GetAllPlaylist,
  PatchPlaylist,
} from './playlist.request';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private readonly prisma: PrismaService) {}
  async create(payload: CreatePlaylist) {
    return await this.prisma.playlist.create({
      data: payload,
    });
  }

  // async findAll(payload: GetAllPlaylist) {
  //   try {
  //     const playlist = await this.prisma.playlist.findMany({
  //       where: {
  //         user_id: Number(payload.user_id),
  //       },
  //       include: {
  //         musics: true,
  //       },
  //     });
  //     return playlist;
  //   } catch (error) {
  //     return [];
  //   }
  // }
  async findAll(payload: GetAllPlaylist) {
    try {
      const playlists = await this.prisma.playlist.findMany({
        where: {
          user_id: Number(payload.user_id),
        },
        include: {
          musics: {
            include: {
              music: true,
            },
          },
        },
      });

      const result = playlists.map((p) => ({
        ...p,
        musics: p.musics.map((pm) => pm.music),
      }));

      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async findOne(id: number) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: {
        musics: {
          include: {
            music: true,
          },
        },
      },
    });

    if (!playlist) return null;

    const musics = playlist.musics.map((pm) => pm.music);

    return {
      ...playlist,
      musics,
    };
  }

  async update(id: number, payload: PatchPlaylist) {
    return await this.prisma.playlist.update({
      where: { id },
      data: { name: payload.name },
    });
  }

  async remove(id: number) {
    return await this.prisma.playlist.delete({
      where: { id: id },
    });
  }
}
