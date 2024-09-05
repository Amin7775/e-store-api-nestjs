import { Module } from '@nestjs/common';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [SellerModule, BuyerModule, ProductModule, OrderModule, ReviewModule],
})
export class AppModule {}
