import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[] | undefined> {
    const userRepository = getCustomRepository(UserRepository);
    return userRepository.find();
  }
}

export default ListUserService;
