import { Router } from 'express';
import ActiveSellersController from '../controllers/ActiveSellersController';
import SellersController from '../controllers/SellersController';
import CreateSellerValidation from '../middlewares/Validations/CreateSellerValidation';
import UpdateSellerValidation from '../middlewares/Validations/UpdateSellerValidation';

const routes = Router();

routes.post('/', CreateSellerValidation, SellersController.create);
routes.get('/', SellersController.index);
routes.get('/ativos', ActiveSellersController.index);
routes.get('/:id', SellersController.show);
routes.put('/:id', UpdateSellerValidation, SellersController.update);

export default routes;
