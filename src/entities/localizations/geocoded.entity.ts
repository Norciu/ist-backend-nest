import { ResultsDatasource, ResultsRank } from 'src/geoapify/geoapify.dto';
import {
  Column, CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Location } from './location.entity';

@Unique('unique_locations', ['housenumber', 'street', 'city', 'postcode', 'country'])
@Entity({
  schema: 'localizations',
})
export class Geocoded {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'jsonb',
    nullable: false,
  })
  datasource: ResultsDatasource;


  @Column({
    name: 'house_number',
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  housenumber: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  street: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  state: string;

  @Column({
    name: 'post_code',
    type: 'varchar',
    length: 10,
  })
  postcode: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  country_code: string;

  @Column({
    type: 'float8',
    nullable: true,
  })
  lon: number;

  @Column({
    type: 'float8',
    nullable: true,
  })
  lat: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  formatted: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address_line1: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address_line2: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  category: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  result_type: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  rank: ResultsRank;

  @Column({
    type: 'varchar',
    length: 255,
  })
  place_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Location, ({ geocoded }) => geocoded)
  locations: Location[];
}
