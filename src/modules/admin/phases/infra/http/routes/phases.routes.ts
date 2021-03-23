import { Router } from 'express';
import PhasesController from '../controllers/PhasesController';
import CreatePhaseValidation from '../middlewares/Validations/CreatePhaseValidation';
import ShowPhaseValidation from '../middlewares/Validations/ShowPhaseValidation';
import UpdatePhaseValidation from '../middlewares/Validations/UpdatePhaseValidation';

const routes = Router();

routes.get('/', PhasesController.index);
routes.post('/', CreatePhaseValidation, PhasesController.create);
routes.get('/:id', ShowPhaseValidation, PhasesController.show);
routes.put('/:id', UpdatePhaseValidation, PhasesController.update);

export default routes;
