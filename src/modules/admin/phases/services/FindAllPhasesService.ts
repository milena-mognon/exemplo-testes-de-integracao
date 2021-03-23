import Phase from '../infra/typeorm/entities/Phase';
import PhasesRepository from '../infra/typeorm/repositories/PhasesRepository';

export default class FindAllPhasesService {
  public async execute(): Promise<Phase[]> {
    const phasesRepository = new PhasesRepository();

    const phases = await phasesRepository.findAll();

    return phases;
  }
}
