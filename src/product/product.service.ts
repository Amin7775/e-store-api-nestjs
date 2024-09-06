import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  //   get all products from all the users
  async getAllProducts() {
    return this.prisma.product.findMany({
      include: {
        seller: true,
      },
    });
  }

  // Get a single product by ID
  async getProductById(productId: number) {
    return this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        seller: true,
      },
    });
  }
}
