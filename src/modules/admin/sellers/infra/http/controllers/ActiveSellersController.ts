import FindActiveSellersService from '@modules/admin/sellers/services/FindActiveSellersService';
import { Request, Response } from 'express';

class ActiveSellersController {
  public async index(request: Request, response: Response) {
    const findAllActiveSellers = new FindActiveSellersService();

    const sellers = await findAllActiveSellers.execute();

    return response.json(sellers);
  }
}

export default new ActiveSellersController();
