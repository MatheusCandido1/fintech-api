import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsEnum,
    IsUUID,
    IsPositive,
    IsDateString,
  } from 'class-validator';

import { TransactionType } from '../entities/transaction';
  
export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    bankAccountId: string;


    @IsString()
    @IsNotEmpty()
    @IsUUID()
    categoryId: string

    @IsString()
    @IsNotEmpty()
    name: string
  
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    value: number;
  
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    @IsEnum(TransactionType)
    type: TransactionType;
}
  