import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SellerService } from './seller.service';
import {
  CreateProductDto,
  RegisterSellerDto,
  SellerLoginDto,
  UpdateOrderStatusDto,
} from './dto';

@Controller('seller')
export class SellerController {
  constructor(private sellerService: SellerService) {}

  // seller registration
  @Post('register')
  register(@Body() dto: RegisterSellerDto) {
    return this.sellerService.register(dto);
  }

  // seller login
  @Post('login')
  login(@Body() dto: SellerLoginDto) {
    return this.sellerService.login(dto);
  }

  // get all products from a single seller
  @Get(':sellerId/products')
  async getProducts(@Param('sellerId') sellerId: number) {
    return this.sellerService.getProducts(sellerId);
  }

  // add new product
  @Post(':sellerId/products')
  addProduct(
    @Param('sellerId') sellerId: number,
    @Body() dto: CreateProductDto,
  ) {
    return this.sellerService.addProduct(sellerId, dto);
  }

  // all orders for a single seller
  @Get(':sellerId/orders')
  async getOrders(@Param('sellerId') sellerId: number) {
    return this.sellerService.getOrders(sellerId);
  }

  // update order status
  @Patch(':sellerId/orders/:orderId')
  async updateOrderStatus(
    @Param('sellerId') sellerId: number,
    @Param('orderId') orderId: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.sellerService.updateOrderStatus(sellerId, orderId, dto);
  }
}
