import CreateSellerService from '@modules/admin/sellers/services/CreateSellerService';
import FindAllSellersService from '@modules/admin/sellers/services/FindAllSellersService';
import FindSellerByIdService from '@modules/admin/sellers/services/FindSellerByIdService';
import UpdateSellerService from '@modules/admin/sellers/services/UpdateSellerService';
import { Request, Response } from 'express';

class SellersController {
  public async index(request: Request, response: Response) {
    const findAllSellersService = new FindAllSellersService();

    const sellers = await findAllSellersService.execute();

    return response.json(sellers);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const findSellerById = new FindSellerByIdService();

    const seller = await findSellerById.execute(id);

    return response.json(seller);
  }

  public async create(request: Request, response: Response) {
    const data = request.body;

    const createSellerService = new CreateSellerService();

    const seller = await createSellerService.execute(data);

    return response.json(seller);
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body;

    const updateSellerService = new UpdateSellerService();

    const seller = await updateSellerService.execute({ id, ...data });

    return response.json(seller);
  }
}

export default new SellersController();
