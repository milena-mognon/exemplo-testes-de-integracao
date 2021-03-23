import ICreateSellerDTO from '@modules/admin/sellers/dtos/ICreateSellerDTO';
import IUpdateSellerDTO from '@modules/admin/sellers/dtos/IUpdateSellerDTO';
import ISellersRepository from '@modules/admin/sellers/repositories/ISellersRepository';
import { getRepository, Repository } from 'typeorm';
import Seller from '../entities/Seller';

interface IFindOptions {
  description: string;
  real_estate_id: string;
}
export default class SellersRepository implements ISellersRepository {
  private ormRepository: Repository<Seller>;

  constructor() {
    this.ormRepository = getRepository(Seller);
  }

  async findAllActiveSellers(): Promise<Seller[]> {
    return this.ormRepository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.real_estate', 're')
      .where('s.active = true')
      .getMany();
  }

  async update(data: IUpdateSellerDTO): Promise<Seller> {
    return this.ormRepository.save(data);
  }

  async findByDescriptionAndRealEstate({
    description,
    real_estate_id,
  }: IFindOptions): Promise<Seller | undefined> {
    return this.ormRepository
      .createQueryBuilder('s')
      .where('s.description = :description', { description })
      .andWhere('s.real_estate_id = :real_estate_id', { real_estate_id })
      .getOne();
  }

  /**
   * Find Seller By Id
   * @param id
   */
  async findById(id: string): Promise<Seller | undefined> {
    return this.ormRepository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.real_estate', 're')
      .where('s.id = :id', { id })
      .getOne();
  }

  /**
   * Find all sellers (active and inactive)
   * @returns Seller[]
   */
  async findAll(): Promise<Seller[]> {
    return this.ormRepository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.real_estate', 're')
      .getMany();
  }

  /**
   * Create and save a new seller
   * @returns Seller
   * @param data
   */
  async create(data: ICreateSellerDTO): Promise<Seller> {
    const seller = this.ormRepository.create(data);
    return this.ormRepository.save(seller);
  }
}
