import AppError from '@shared/errors/AppErrors';
import Seller from '../infra/typeorm/entities/Seller';
import SellersRepository from '../infra/typeorm/repositories/SellersRepository';

export default class FindSellerByIdService {
  public async execute(id: string): Promise<Seller> {
    const sellersRepository = new SellersRepository();

    const seller = await sellersRepository.findById(id);

    if (!seller) {
      throw new AppError('Vendedor não encontrado');
    }

    return seller;
  }
}
