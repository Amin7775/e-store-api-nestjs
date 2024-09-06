import { Controller, Get, Param } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  // get all the reviews
  @Get('all')
  async getAllProducts() {
    return this.reviewService.getAllReviews();
  }

  // Get a single review by ID
  @Get(':reviewId')
  async getProductById(@Param('reviewId') reviewId: number) {
    return this.reviewService.getReviewById(Number(reviewId));
  }
}
