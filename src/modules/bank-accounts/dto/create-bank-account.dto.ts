import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsHexColor,
} from 'class-validator';
import { BankAccountType } from '../entities/bank-account';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
