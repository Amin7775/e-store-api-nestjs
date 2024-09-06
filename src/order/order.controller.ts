import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // get all the products
  @Get('all')
  async getAllProducts() {
    return this.orderService.getAllOrders();
  }

  // Get a single product by ID
  @Get(':orderId')
  async getProductById(@Param('orderId') orderId: number) {
    return this.orderService.getOrderById(Number(orderId));
  }
}
