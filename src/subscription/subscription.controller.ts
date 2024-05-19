import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscribeDto } from './dto/subscribe.dto';

@Controller('api/subscribe')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, stopAtFirstError: true }))
  @HttpCode(200)
  async subscribe(@Body() subscribeDto: SubscribeDto) {
    try {
      await this.subscriptionService.subscribe(subscribeDto.email);
      return { message: 'E-mail додано' };
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new HttpException(
          'E-mail вже є в базі даних',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
