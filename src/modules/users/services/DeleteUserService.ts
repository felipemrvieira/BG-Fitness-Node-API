import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class deleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    await userRepository.remove(user);
  }
}

export default deleteUserService;
