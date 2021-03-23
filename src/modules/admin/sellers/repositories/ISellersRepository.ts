import ICreateSellerDTO from '../dtos/ICreateSellerDTO';
import IUpdateSellerDTO from '../dtos/IUpdateSellerDTO';
import Seller from '../infra/typeorm/entities/Seller';

interface IFindOption {
  description: string;
  real_estate_id: string;
}
export default interface ISellersRepository {
  create(data: ICreateSellerDTO): Promise<Seller>;
  update(data: IUpdateSellerDTO): Promise<Seller>;
  findAll(): Promise<Seller[]>;
  findById(id: string): Promise<Seller | undefined>;
  findByDescriptionAndRealEstate({
    description,
    real_estate_id,
  }: IFindOption): Promise<Seller | undefined>;
  findAllActiveSellers(): Promise<Seller[]>;
}
