import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  //   get all reviews from all the buyers
  async getAllReviews() {
    return this.prisma.review.findMany({
      include: {
        product: true,
      },
    });
  }

  // Get a single review by ID
  async getReviewById(reviewId: number) {
    return this.prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        product: true,
      },
    });
  }
}
