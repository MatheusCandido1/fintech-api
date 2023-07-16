import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailTaken = await this.usersRepo.findUnique({
      where: { email: createUserDto.email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('This email has been taken');
    }

    const hashedPassword = await hash(password, 12);

    await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              { name: 'Salary', icon: 'salary', type: 'INCOME' },
              { name: 'Freelancing', icon: 'freelance', type: 'INCOME' },
              { name: 'Other', icon: 'other', type: 'INCOME' },
              { name: 'House', icon: 'home', type: 'EXPENSE' },
              { name: 'Food', icon: 'food', type: 'EXPENSE' },
              { name: 'Education', icon: 'education', type: 'EXPENSE' },
              { name: 'Leisure', icon: 'fun', type: 'EXPENSE' },
              { name: 'Grocery', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Clothing', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transport', icon: 'transport', type: 'EXPENSE' },
              { name: 'Travel', icon: 'travel', type: 'EXPENSE' },
              { name: 'Other', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    return {
      name,
      email,
    };
  }
}
