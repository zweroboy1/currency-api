import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DataFetcherService } from './data-fetcher/data-fetcher.service';
import { DataFetcherModule } from './data-fetcher/data-fetcher.module';
import { RateModule } from './rate/rate.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    DataFetcherModule,
    RateModule,
    SubscriptionModule,
    MailModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, DataFetcherService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dataFetcherService: DataFetcherService) {}

  async onModuleInit() {
    await this.dataFetcherService.fetchRate();
  }
}
