import RealEstate from '../infra/typeorm/entities/RealEstate';
import RealEstateRepository from '../infra/typeorm/repositories/RealEstateRepository';

export default class FindAllRealEstateService {
  public async execute(): Promise<RealEstate[]> {
    const realEstateRepository = new RealEstateRepository();

    const real_estate = await realEstateRepository.findAll();

    return real_estate;
  }
}
