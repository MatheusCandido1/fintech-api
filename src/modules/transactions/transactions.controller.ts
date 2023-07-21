import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, HttpCode, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/active-user-id.decorator';
import { OptionalParseUUIDPipe } from 'src/shared/pipes/OptionalParseUUIDPipe';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createTransactionDto: CreateTransactionDto
  ) {
    return this.transactionsService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('bankAccountId', OptionalParseUUIDPipe) bankAccountId?: string
  ) {
    return this.transactionsService.findAllByUserId(userId, { month, year, bankAccountId });
  }

  @Put(':transactionId')
  update(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string, 
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this.transactionsService.update(userId, transactionId, updateTransactionDto);
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @ActiveUserId() userId: string,
    @Param('transactionId', ParseUUIDPipe) transactionId: string
  ) {
    return this.transactionsService.remove(userId, transactionId);
  }
}
