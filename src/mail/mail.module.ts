import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { RateService } from 'src/rate/rate.service';

@Module({
  providers: [MailService, PrismaService, RateService],
})
export class MailModule {}
