import {
  Column, CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { Location } from './location.entity';

@Entity()
export class Street {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    length: 50,
  })
    streetName: string;

  @Column({
    nullable: false,
    length: 7,
  })
    ulic: string;

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

  @CreateDateColumn({ type: 'timestamp' })
    updatedAt: number;

  @ManyToOne(() => City, (city) => city.streets, {
    nullable: false,
  })
    city: number;

  @OneToMany(() => Location, (location) => location.city)
    locations: Location[];
}
