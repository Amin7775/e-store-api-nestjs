import { Module } from '@nestjs/common';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SellerModule,
    BuyerModule,
    ProductModule,
    OrderModule,
    ReviewModule,
    PrismaModule,
  ],
})
export class AppModule {}
