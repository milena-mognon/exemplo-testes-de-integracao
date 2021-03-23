import IRealEstateRepository from '@modules/admin/realEstate/repositories/IRealEstateRepository';
import { getRepository, Repository } from 'typeorm';
import RealEstate from '../entities/RealEstate';

export default class RealEstateRepository implements IRealEstateRepository {
  private ormRepository: Repository<RealEstate>;

  constructor() {
    this.ormRepository = getRepository(RealEstate);
  }

  async findById(id: string): Promise<RealEstate | undefined> {
    return this.ormRepository.findOne(id);
  }

  async findAll(): Promise<RealEstate[]> {
    return this.ormRepository.find();
  }
}
