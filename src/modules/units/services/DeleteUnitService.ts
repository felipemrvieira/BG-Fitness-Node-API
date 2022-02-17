import { UnitRepository } from '../typeorm/repositories/UnitsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class deleteUnitService {
  public async execute({ id }: IRequest): Promise<void> {
    const unitRepository = getCustomRepository(UnitRepository);

    const unit = await unitRepository.findOne(id);
    if (!unit) {
      throw new Error('Unit not found');
    }

    await unitRepository.remove(unit);
  }
}

export default deleteUnitService;
