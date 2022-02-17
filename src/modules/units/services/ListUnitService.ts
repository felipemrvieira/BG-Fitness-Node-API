import { UnitRepository } from '../typeorm/repositories/UnitsRepository';
import { Unit } from '../typeorm/entities/Unit';
import { getCustomRepository } from 'typeorm';

class ListUnitService {
  public async execute(): Promise<Unit[]> {
    const unitRepository = getCustomRepository(UnitRepository);

    const units = await unitRepository.find();

    return units;
  }
}

export default ListUnitService;
