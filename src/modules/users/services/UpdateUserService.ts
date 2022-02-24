import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { User } from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    const userExists = await userRepository.findByEmail(email);
    if (userExists && email !== user.email) {
      throw new AppError('User already exists');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
