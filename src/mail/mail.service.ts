import dotenv = require('dotenv');
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../prisma/prisma.service';
import { RateService } from 'src/rate/rate.service';

dotenv.config();
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT, 10);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private prisma: PrismaService,
    private rateService: RateService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    } as nodemailer.TransportOptions);
  }

  async sendCurrentRate(
    receiverEmail: string,
    rate: number,
    date: string,
  ): Promise<boolean> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: SMTP_USER,
      to: receiverEmail,
      subject: `UAH/USD rate at ${date}`,
      text: `Current rate: 1 USD = ${rate} UAH`,
    };
    try {
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      return false;
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM) // EVERY_10_SECONDS - can be used for testing
  async sendScheduledMails() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const users = await this.prisma.subscription.findMany({
      where: {
        OR: [
          { lastSentDate: null },
          { lastSentDate: { lt: today.toISOString() } },
        ],
      },
    });
    if (!users) {
      return;
    }
    const rate = await this.rateService.getRate();
    if (!rate) {
      return;
    }
    const formattedDate = today.toLocaleDateString();
    for (const user of users) {
      const sent = await this.sendCurrentRate(user.email, rate, formattedDate);
      console.log('Send mail to', user.email);
      if (true || sent) {
        // When configured smtp, remove true
        await this.prisma.subscription.update({
          where: { id: user.id },
          data: { lastSentDate: new Date().toISOString() },
        });
      }
    }
  }
}
