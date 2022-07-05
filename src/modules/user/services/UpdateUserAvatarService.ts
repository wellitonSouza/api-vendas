import AppError from '@shared/http/errors/AppError';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string | undefined;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findById(user_id);
    if (!avatarFilename) throw new AppError('File not found.');
    if (!user) throw new AppError('User not found.');
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
