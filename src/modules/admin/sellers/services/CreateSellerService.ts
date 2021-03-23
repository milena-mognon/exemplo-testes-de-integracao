import FindRealEstateByIdService from '@modules/admin/realEstate/services/FindRealEstateByIdService';
import AppError from '@shared/errors/AppErrors';
import ICreateSellerDTO from '../dtos/ICreateSellerDTO';
import Seller from '../infra/typeorm/entities/Seller';
import SellersRepository from '../infra/typeorm/repositories/SellersRepository';

export default class CreateSellerService {
  public async execute(data: ICreateSellerDTO): Promise<Seller> {
    const sellersRepository = new SellersRepository();
    const findRealEstateById = new FindRealEstateByIdService();

    const checkIfExist = await sellersRepository.findByDescriptionAndRealEstate(
      {
        description: data.description,
        real_estate_id: data.real_estate_id,
      },
    );

    if (checkIfExist) {
      throw new AppError('Esse vendedor já existe', 400, true);
    }

    await findRealEstateById.execute(data.real_estate_id);

    const seller = await sellersRepository.create(data);

    return seller;
  }
}
