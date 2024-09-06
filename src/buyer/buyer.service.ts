import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BuyerLoginDto,
  LeaveReviewDto,
  PlaceOrderDto,
  RegisterBuyerDto,
} from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BuyerService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterBuyerDto) {
    // generate the pw hash
    const hash = await argon.hash(dto.password);

    try {
      // save new user in db
      const user = await this.prisma.buyer.create({
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
  async login(dto: BuyerLoginDto) {
    // find user by email
    const user = await this.prisma.buyer.findUnique({
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

  //   place order
  async placeOrder(buyerId: number, dto: PlaceOrderDto) {
    const { sellerId, products } = dto;

    // create order in the db
    const order = await this.prisma.order.create({
      data: {
        buyerId: Number(buyerId),
        sellerId: Number(sellerId),
        products: {
          create: products.map((product) => ({
            productId: Number(product.productId),
            quantity: product.quantity,
          })),
        },
      },
      include: {
        products: true,
      },
    });
    return order;
  }

  // mark order as received
  async markOrderAsReceived(buyerId: number, orderId: number) {
    return this.prisma.order.updateMany({
      where: {
        id: Number(orderId),
        buyerId: Number(buyerId),
        status: 'shipped',
      },
      data: {
        status: 'received',
      },
    });
  }

  // leaving a review
  async leaveReview(buyerId: number, orderId: number, dto: LeaveReviewDto) {
    const { productId, rating, comment } = dto;
    // check if order exists and is related to the buyer
    const order = await this.prisma.order.findUnique({
      where: {
        id: Number(orderId),
        buyerId: Number(buyerId),
      },
      include: {
        products: true,
      },
    });

    // throw error if no result
    if (!order) {
      throw new Error('Order not found');
    }

    // check if the product that is reviewed is a part of order we are trying to review
    const productInOrder = order.products.find(
      (product) => product.productId === Number(productId),
    );
    if (!productInOrder) {
      throw new Error('Product is not part of this order');
    }

    // now for the final part -> review
    const review = await this.prisma.review.create({
      data: {
        rating,
        comment,
        productId: Number(productId),
        orderId: Number(orderId),
      },
    });

    return review;
  }
}
