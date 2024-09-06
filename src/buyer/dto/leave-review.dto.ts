import { IsInt, IsString, Min, Max } from 'class-validator';

export class LeaveReviewDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}
