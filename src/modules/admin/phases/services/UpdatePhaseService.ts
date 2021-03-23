import AppError from '@shared/errors/AppErrors';
import IUpdatePhaseDTO from '../dtos/IUpdatePhaseDTO';
import Phase from '../infra/typeorm/entities/Phase';
import PhasesRepository from '../infra/typeorm/repositories/PhasesRepository';

export default class UpdatePhaseService {
  public async execute(data: IUpdatePhaseDTO): Promise<Phase> {
    const phasesRepository = new PhasesRepository();

    const checkIfExistById = await phasesRepository.findById(data.id);

    if (!checkIfExistById) {
      throw new AppError('Fase não encontrada!');
    }

    const checkIfExist = await phasesRepository.findByDescription(
      data.description,
    );

    if (checkIfExist && checkIfExist.id !== data.id) {
      throw new AppError('Esta fase já existe!', 400, true);
    }

    const phase = await phasesRepository.update(data);

    return phase;
  }
}
