import ICreatePhaseDTO from '@modules/admin/phases/dtos/ICreatePhaseDTO';
import IUpdatePhaseDTO from '@modules/admin/phases/dtos/IUpdatePhaseDTO';
import IPhasesRepository from '@modules/admin/phases/repositories/IPhasesRepository';
import { getRepository, Repository } from 'typeorm';
import Phase from '../entities/Phase';

export default class PhasesRepository implements IPhasesRepository {
  private ormRepository: Repository<Phase>;

  constructor() {
    this.ormRepository = getRepository(Phase);
  }

  async findAll(): Promise<Phase[]> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<Phase | undefined> {
    return this.ormRepository.findOne(id);
  }

  async findByDescription(description: string): Promise<Phase | undefined> {
    return this.ormRepository.findOne({
      where: {
        description,
      },
    });
  }

  async create(data: ICreatePhaseDTO): Promise<Phase> {
    const phase = this.ormRepository.create(data);

    return this.ormRepository.save(phase);
  }

  async update(data: IUpdatePhaseDTO): Promise<Phase> {
    return this.ormRepository.save(data);
  }
}
