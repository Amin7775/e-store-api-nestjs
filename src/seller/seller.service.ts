import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { RegisterSellerDto } from './dto';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  register(dto: RegisterSellerDto) {
    const hash = argon.hash(dto.password);
    console.log(hash);
    // return { msg: 'This is Register' };
  }
}
