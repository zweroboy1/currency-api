import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrencyData } from 'src/types/CurrencyData';

@Injectable()
export class DataFetcherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async hasDataToday(): Promise<boolean> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const existingData = await this.prisma.currency.findFirst({
      where: {
        updatedAt: {
          gte: today.toISOString(),
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        },
      },
    });
    return Boolean(existingData);
  }

  async fetchRate() {
    const hasDataToday = await this.hasDataToday();
    if (hasDataToday) {
      return;
    }

    const response = await firstValueFrom(
      this.httpService.get<CurrencyData[]>(
        'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5',
      ),
    );
    const data = response.data;
    const filteredData = data.find(
      (item: CurrencyData) => item.ccy === 'USD' && item.base_ccy === 'UAH',
    );

    if (!filteredData) {
      console.log('Currency pair not found');
    }

    const buyValue = filteredData.buy;
    await this.prisma.currency.create({
      data: {
        code_from: 'USD',
        code_to: 'UAH',
        rate: Number(buyValue),
      },
    });
  }
}
