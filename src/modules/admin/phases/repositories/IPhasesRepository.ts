import ICreatePhaseDTO from '../dtos/ICreatePhaseDTO';
import IUpdatePhaseDTO from '../dtos/IUpdatePhaseDTO';
import Phase from '../infra/typeorm/entities/Phase';

export default interface IPhasesRepository {
  findAll(): Promise<Phase[]>;
  findById(id: string): Promise<Phase | undefined>;
  findByDescription(description: string): Promise<Phase | undefined>;
  create(data: ICreatePhaseDTO): Promise<Phase>;
  update(data: IUpdatePhaseDTO): Promise<Phase>;
}
