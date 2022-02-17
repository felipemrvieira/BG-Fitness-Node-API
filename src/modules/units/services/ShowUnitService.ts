import { UnitRepository } from '../typeorm/repositories/UnitsRepository';
import { Unit } from '../typeorm/entities/Unit';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowUnitService {
  public async execute({ id }: IRequest): Promise<Unit> {
    const unitRepository = getCustomRepository(UnitRepository);

    const unit = await unitRepository.findOne(id);
    if (!unit) {
      throw new Error('Unit not found');
    }

    return unit;
  }
}

export default ShowUnitService;
