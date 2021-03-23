import AppError from '@shared/errors/AppErrors';
import Phase from '../infra/typeorm/entities/Phase';
import PhasesRepository from '../infra/typeorm/repositories/PhasesRepository';

export default class FindByIdService {
  public async execute(id: string): Promise<Phase> {
    const phasesRepository = new PhasesRepository();

    const phase = await phasesRepository.findById(id);

    if (!phase) {
      throw new AppError('Fase não encontrada!');
    }

    return phase;
  }
}
