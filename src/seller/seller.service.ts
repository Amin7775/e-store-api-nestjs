import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { RegisterSellerDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterSellerDto) {
    // generate the pw hash
    const hash = await argon.hash(dto.password);

    try {
      // save new user in db
      const user = await this.prisma.seller.create({
        data: {
          email: dto.email,
          hash,
          name: dto.name,
        },
      });
      // to stop showing hash
      delete user.hash;
      // return the user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }
}
