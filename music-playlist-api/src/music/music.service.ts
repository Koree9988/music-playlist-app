import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class MusicService {
  constructor(
    private readonly prisma: PrismaService,
    // private readonly repository: CustomerRepository,
  ) {}
  create(createMusicDto: CreateMusicDto) {
    return 'This action adds a new music';
  }

  async findAll() {
    // return `This action returns all music`;
    try {
      return await this.prisma.music.findMany({
        where: {},
        include: {
          album: true,
        },
      });
    } catch (error) {
      return [];
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.music.findUnique({
        where: { id: id },
        include: {
          album: true,
        },
      });
    } catch (error) {
      return null;
    }
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  remove(id: number) {
    return `This action removes a #${id} music`;
  }
}
