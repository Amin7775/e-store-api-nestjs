import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import {
  CreateProductDto,
  RegisterSellerDto,
  SellerLoginDto,
  UpdateOrderStatusDto,
} from './dto';
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

  //   seller login
  async login(dto: SellerLoginDto) {
    // find user by email
    const user = await this.prisma.seller.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if pw is incorrect
    if (!pwMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    delete user.hash;
    return user;
  }

  //   get all products of a single seller
  async getProducts(sellerId: number) {
    return await this.prisma.product.findMany({
      where: { sellerId: Number(sellerId) },
    });
  }

  //   add new product for a seller
  async addProduct(sellerId: number, dto: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        sellerId: Number(sellerId),
      },
    });
  }

  //   all orders for a single seller
  async getOrders(sellerId: number) {
    return await this.prisma.order.findMany({
      where: { sellerId: Number(sellerId) },
      include: { products: true },
    });
  }

  //   update status of an order
  async updateOrderStatus(
    sellerId: number,
    orderId: number,
    dto: UpdateOrderStatusDto,
  ) {
    return this.prisma.order.updateMany({
      where: {
        id: Number(orderId),
        sellerId: Number(sellerId),
      },
      data: {
        status: dto.status,
      },
    });
  }
}
