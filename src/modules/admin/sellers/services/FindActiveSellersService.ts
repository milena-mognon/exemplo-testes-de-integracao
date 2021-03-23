import Seller from '../infra/typeorm/entities/Seller';
import SellersRepository from '../infra/typeorm/repositories/SellersRepository';

export default class FindActiveSellersService {
  public async execute(): Promise<Seller[]> {
    const sellersRepository = new SellersRepository();

    const sellers = await sellersRepository.findAllActiveSellers();

    return sellers;
  }
}
