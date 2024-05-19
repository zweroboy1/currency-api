import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DataFetcherService } from './data-fetcher.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [HttpModule],
  providers: [DataFetcherService, PrismaService],
  exports: [DataFetcherService],
})
export class DataFetcherModule {}
