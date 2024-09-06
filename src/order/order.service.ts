import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  //   get all orders
  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        buyer: true,
      },
    });
  }

  //   get single order info by id
  async getOrderById(orderId: number) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
      },
    });
  }
}
