import AppError from '@shared/errors/AppErrors';
import IUpdateSellerDTO from '../dtos/IUpdateSellerDTO';
import Seller from '../infra/typeorm/entities/Seller';
import SellersRepository from '../infra/typeorm/repositories/SellersRepository';

export default class UpdateSellerService {
  public async execute(data: IUpdateSellerDTO): Promise<Seller> {
    const sellersRepository = new SellersRepository();

    const seller = await sellersRepository.findById(data.id);

    if (!seller) {
      throw new AppError('Vendedor não encontrado');
    }

    const checkIfExist = await sellersRepository.findByDescriptionAndRealEstate(
      {
        description: data.description,
        real_estate_id: seller.real_estate_id,
      },
    );

    if (checkIfExist && checkIfExist.id !== seller.id) {
      throw new AppError('Esse vendedor já existe');
    }

    const updated_seller = await sellersRepository.update(data);

    return updated_seller;
  }
}
