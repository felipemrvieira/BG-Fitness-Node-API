import { UnitRepository } from '../typeorm/repositories/UnitsRepository';
import { Unit } from '../typeorm/entities/Unit';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  address: string;
}

class CreateUnitService {
  // constructor(unitRepository) {
  //   this.unitRepository = unitRepository;
  // }

  public async execute({ name, address }: IRequest): Promise<Unit> {
    const unitRepository = getCustomRepository(UnitRepository);

    const unitExists = await unitRepository.findByName(name);
    if (unitExists) {
      throw new AppError('Unit already exists');
    }

    const unit = await unitRepository.create({ name, address });

    await unitRepository.save(unit);
    return unit;
  }
}

export default CreateUnitService;
