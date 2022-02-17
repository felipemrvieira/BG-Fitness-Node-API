import { UnitRepository } from '../typeorm/repositories/UnitsRepository';
import { Unit } from '../typeorm/entities/Unit';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  address: string;
}

class UpdateUnitService {
  public async execute({ id, name, address }: IRequest): Promise<Unit> {
    const unitRepository = getCustomRepository(UnitRepository);

    const unit = await unitRepository.findOne(id);
    if (!unit) {
      throw new Error('Unit not found');
    }

    const unitExists = await unitRepository.findByName(name);
    if (unitExists && name !== unit.name) {
      throw new AppError('Unit already exists');
    }

    unit.name = name;
    unit.address = address;

    await unitRepository.save(unit);

    return unit;
  }
}

export default UpdateUnitService;
