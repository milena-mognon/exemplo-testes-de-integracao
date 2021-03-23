import RealEstate from '../infra/typeorm/entities/RealEstate';

export default interface IRealEstateRepository {
  findAll(): Promise<RealEstate[]>;
  findById(id: string): Promise<RealEstate | undefined>;
}
