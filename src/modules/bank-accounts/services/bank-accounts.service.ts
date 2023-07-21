import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository, private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, color, initialBalance, type } = createBankAccountDto;

    return this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepo.findMany({
      where: { userId }
    });
  }

  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {
    
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);

    return this.bankAccountsRepo.update({
      where: {
        id: bankAccountId
      },
      data: updateBankAccountDto
    });
  }

  async remove(userId: string, bankAccountId: string) {
    
    await this.validateBankAccountOwnershipService.validate(userId, bankAccountId);
    
    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId }
    });

    return null;

  }
}
