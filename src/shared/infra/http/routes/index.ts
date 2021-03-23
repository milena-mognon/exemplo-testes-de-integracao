import { Router } from 'express';

import sellersRoutes from '@modules/admin/sellers/infra/http/routes/sellers.routes';
import realEstateRoutes from '@modules/admin/realEstate/infra/http/routes/realEstate.routes';
import phasesRoutes from '@modules/admin/phases/infra/http/routes/phases.routes';

const routes = Router();

routes.use('/vendedores', sellersRoutes);
routes.use('/imobiliarias', realEstateRoutes);
routes.use('/fases', phasesRoutes);

export default routes;
