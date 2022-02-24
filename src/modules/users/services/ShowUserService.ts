import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { User } from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default ShowUserService;
