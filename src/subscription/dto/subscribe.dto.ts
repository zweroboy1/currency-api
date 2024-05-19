import { IsEmail, IsString } from 'class-validator';
export class SubscribeDto {
  @IsEmail({}, { message: 'Невірний формат email' })
  @IsString({ message: 'Повинно бути заповнене поле email' })
  email: string;
}
