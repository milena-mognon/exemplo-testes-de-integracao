import CreatePhaseService from '@modules/admin/phases/services/CreatePhaseService';
import FindAllPhasesService from '@modules/admin/phases/services/FindAllPhasesService';
import FindByIdService from '@modules/admin/phases/services/FindByIdService';
import UpdatePhaseService from '@modules/admin/phases/services/UpdatePhaseService';
import { Request, Response } from 'express';

class PhasesController {
  public async index(request: Request, response: Response) {
    const findAllPhasesService = new FindAllPhasesService();

    const phases = await findAllPhasesService.execute();

    return response.json(phases);
  }

  public async create(request: Request, response: Response) {
    const data = request.body;

    const createPhaseService = new CreatePhaseService();

    const phase = await createPhaseService.execute(data);

    return response.json(phase);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const findByIdService = new FindByIdService();

    const phase = await findByIdService.execute(id);

    return response.json(phase);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body;

    const updatePhaseService = new UpdatePhaseService();

    const phase = await updatePhaseService.execute({ id, ...data });

    return response.json(phase);
  }
}

export default new PhasesController();
