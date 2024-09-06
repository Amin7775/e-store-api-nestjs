import { Body, Controller, Post } from '@nestjs/common';
import { SellerService } from './seller.service';
import { RegisterSellerDto } from './dto';

@Controller('seller')
export class SellerController {
  constructor(private sellerService: SellerService) {}

  // seller registration
  @Post('register')
  register(@Body() dto: RegisterSellerDto) {
    return this.sellerService.register(dto);
  }
}
