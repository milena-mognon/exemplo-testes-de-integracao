import { Router } from 'express';
import RealEstateController from '../controllers/RealEstateController';

const routes = Router();

routes.get('/', RealEstateController.index);

export default routes;
