import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderProductDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

export class PlaceOrderDto {
  @IsInt()
  sellerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto) // Transform to OrderProductDto
  products: OrderProductDto[];
}
