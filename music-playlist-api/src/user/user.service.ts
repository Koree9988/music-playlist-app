/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UtilsService } from 'src/core/utils.service';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly utilsSrv: UtilsService,
    private readonly prisma: PrismaService,
    // private readonly repository: CustomerRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const password = await this.utilsSrv.encryptPassword(
        createUserDto.password,
      );
      const user = { ...createUserDto, password };
      return this.prisma.users.create({
        data: user,
      });
    } catch (error) {
      return 'This action adds a new user';
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  async findOne(id: number) {
    // return `This action returns a #${id} user`;
    try {
      return await this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return null;
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
