import Seller from '../infra/typeorm/entities/Seller';
import SellersRepository from '../infra/typeorm/repositories/SellersRepository';

export default class FindAllSellersService {
  public async execute(): Promise<Seller[]> {
    const sellersRepository = new SellersRepository();

    const sellers = await sellersRepository.findAll();

    return sellers;
  }
}
