import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import {
  BuyerLoginDto,
  LeaveReviewDto,
  PlaceOrderDto,
  RegisterBuyerDto,
} from './dto';

@Controller('buyer')
export class BuyerController {
  constructor(private buyerService: BuyerService) {}

  // buyer registration
  @Post('register')
  register(@Body() dto: RegisterBuyerDto) {
    return this.buyerService.register(dto);
  }

  // buyer login
  @Post('login')
  login(@Body() dto: BuyerLoginDto) {
    return this.buyerService.login(dto);
  }

  // placing an order
  @Post(':buyerId/orders')
  async placeOrder(
    @Param('buyerId') buyerId: number,
    @Body() dto: PlaceOrderDto,
  ) {
    return this.buyerService.placeOrder(buyerId, dto);
  }

  // mark as received
  @Patch(':buyerId/orders/:orderId/received')
  async markOrderAsReceived(
    @Param('buyerId') buyerId: number,
    @Param('orderId') orderId: number,
  ) {
    return this.buyerService.markOrderAsReceived(buyerId, orderId);
  }

  // leave a review
  @Post(':buyerId/orders/:orderId/review')
  async leaveReview(
    @Param('buyerId') buyerId: number,
    @Param('orderId') orderId: number,
    @Body() dto: LeaveReviewDto,
  ) {
    return this.buyerService.leaveReview(buyerId, orderId, dto);
  }
}
