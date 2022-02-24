import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { User } from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFileName: string | undefined;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    if (avatarFileName) {
      user.avatar = avatarFileName;
      userRepository.save(user);
      return user;
    } else {
      throw new AppError('Avatar not found');
    }
  }
}

export default UpdateUserAvatarService;
