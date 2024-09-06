import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SellerService {
  constructor(private prisma: PrismaService) {}

  register(dto) {
    console.log(dto);
    // return { msg: 'This is Register' };
  }
}
