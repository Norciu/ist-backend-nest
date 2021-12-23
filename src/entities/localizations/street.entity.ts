import {
  Column, CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { Location } from './location.entity';

@Entity({
  schema: 'localizations',
})
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
    created_at: number;

  @CreateDateColumn({ type: 'timestamp' })
    updated_at: number;

  @ManyToOne(() => City, ({ streets }) => streets, {
    nullable: false,
    cascade: true,
  })
    city_id: City | number;

  @OneToMany(() => Location, ({ city_id }) => city_id)
    locations: Location[];
}
