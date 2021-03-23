import FindAllRealEstateService from '@modules/admin/realEstate/services/FindAllRealEstateService';
import { Request, Response } from 'express';

class RealEstateController {
  public async index(request: Request, response: Response) {
    const findAllRealEstateService = new FindAllRealEstateService();

    const real_estate = await findAllRealEstateService.execute();

    return response.json(real_estate);
  }
}

export default new RealEstateController();
