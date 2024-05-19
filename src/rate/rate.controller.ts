import { Controller, Get } from '@nestjs/common';
import { RateService } from './rate.service';
import { CustomBadRequestException } from 'src/exceptions/custom-bad-request.exception';

@Controller('api/rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Get()
  async getRate() {
    try {
      const rate = await this.rateService.getRate();
      return rate;
    } catch (error) {
      throw new CustomBadRequestException(error.message);
    }
  }
}
