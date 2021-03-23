import AppError from '@shared/errors/AppErrors';
import ICreatePhaseDTO from '../dtos/ICreatePhaseDTO';
import Phase from '../infra/typeorm/entities/Phase';
import PhasesRepository from '../infra/typeorm/repositories/PhasesRepository';

export default class CreatePhaseService {
  public async execute(data: ICreatePhaseDTO): Promise<Phase> {
    const phasesRepository = new PhasesRepository();

    const checkIfExist = await phasesRepository.findByDescription(
      data.description,
    );

    if (checkIfExist) {
      throw new AppError('Esta fase já existe!', 400, true);
    }

    const phase = await phasesRepository.create(data);

    return phase;
  }
}
