import AppError from '@shared/errors/AppErrors';
import RealEstate from '../infra/typeorm/entities/RealEstate';
import RealEstateRepository from '../infra/typeorm/repositories/RealEstateRepository';

export default class FindRealEstateByIdService {
  public async execute(id: string): Promise<RealEstate> {
    const realEstateRepository = new RealEstateRepository();

    const real_estate = await realEstateRepository.findById(id);

    if (!real_estate) {
      throw new AppError('Imobiliária não encontrada');
    }

    return real_estate;
  }
}
