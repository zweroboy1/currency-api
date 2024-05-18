import dotenv = require('dotenv');
import dotenvExpand = require('dotenv-expand');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

dotenvExpand.expand(dotenv.config());
const APP_PORT = Number(process.env.APP_PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT);
}
bootstrap();
