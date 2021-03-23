import RealEstate from '@modules/admin/realEstate/infra/typeorm/entities/RealEstate';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sellers')
export default class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  real_estate_id: string;

  @Column({ type: 'boolean' })
  active: boolean;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToOne(() => RealEstate, { eager: true }) // { eager: true }
  @JoinColumn({ name: 'real_estate_id' })
  real_estate: RealEstate;
}
