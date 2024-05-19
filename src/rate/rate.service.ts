import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class RateService {
  constructor(private readonly prisma: PrismaService) { }
  async getRate(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const info = await this.prisma.currency.findFirstOrThrow({
      where: {
        updatedAt: {
          gte: today.toISOString(),
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        },
      },
    });
    return info.rate;
  }
}
