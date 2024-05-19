import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomBadRequestException extends HttpException {
  constructor(message: string) {
    super({ error: message }, HttpStatus.BAD_REQUEST);
  }
}
