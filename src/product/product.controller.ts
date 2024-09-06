import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // get all the products
  @Get('all')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  // Get a single product by ID
  @Get(':productId')
  async getProductById(@Param('productId') productId: number) {
    return this.productService.getProductById(Number(productId));
  }
}
