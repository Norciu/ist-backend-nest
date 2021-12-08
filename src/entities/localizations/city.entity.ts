import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Street } from './street.entity';
import { Location } from './location.entity';

@Entity({
  schema: 'localizations',
})
export class City {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    length: 50,
  })
    cityName!: string;

  @Column({
    length: 6,
  })
    postalCode: string;

  @Column({
    nullable: false,
    length: 7,
    unique: true,
  })
    simc: string;

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

  @CreateDateColumn({ type: 'timestamp' })
    updatedAt: number;

  @OneToMany(() => Street, (street) => street.city, { cascade: true })
    streets: Street[];

  @OneToMany(() => Location, (location) => location.street, { cascade: true })
    locations: Location[];
}
