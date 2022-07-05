import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findByEmail(email);
    if (userExists)
      throw new AppError('There is already one user with this email');

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
