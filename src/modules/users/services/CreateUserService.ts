import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { User } from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
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
    if (userExists) {
      throw new AppError('User email already taken');
    }

    const hashedPassword = await hash(password, 8);
    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
