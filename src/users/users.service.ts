import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
export const roundsOfHasing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //crud operation
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHasing,
    );
    createUserDto.password = hashedPassword;
    //return 'This action adds a new user';
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    //return `This action returns all users`;
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    //return `This action returns a #${id} user`;
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHasing,
      );
    }
    //return `This action updates a #${id} user`;
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    //return `This action removes a #${id} user`;
    return this.prisma.user.delete({ where: { id } });
  }
}
