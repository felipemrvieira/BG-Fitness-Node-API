import { EntityRepository, Repository } from 'typeorm';
import { Unit } from '../entities/Unit';

@EntityRepository(Unit)
export class UnitRepository extends Repository<Unit> {
  public async findByName(name: string): Promise<Unit | undefined> {
    return this.findOne({ name });
  }
}
