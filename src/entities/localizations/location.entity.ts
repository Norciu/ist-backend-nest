import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Technology } from './technology.entity';
import { Street } from './street.entity';
import { City } from './city.entity';
import { LocationOwner } from './location_owner.entity';
import { Comments } from './comment.entity';
import { Geocoded } from './geocoded.entity';

@Entity({
  schema: 'localizations',
})
export class Location {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    length: 20,
    nullable: true,
  })
    flatNo: string;

  @Column({
    length: 4,
  })
    homeNo: string;

  @Column({
    length: 40,
    default: null,
  })
    plotNo: string;

  // If availabe_technology_id is null, then available type is set to 0, 1 to available, 2 to already connected
  @Column({
    type: 'smallint',
    nullable: true,
  })
  available_type: number;

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

  @CreateDateColumn({ type: 'timestamp' })
    updatedAt: number;

  @ManyToOne(() => Geocoded, ({ locations }) => locations)
    geocoded: number | Geocoded;

  @ManyToOne(() => LocationOwner, ({ location_owner }) => location_owner)
    location_owner_id: number | LocationOwner;

  @ManyToOne(() => Street, ({ locations }) => locations, {
    nullable: false,
  })
    street_id: number | Street;

  @ManyToOne(() => City, ({ locations }) => locations, {
    nullable: false,
  })
    city_id: number | City;

  @ManyToOne(() => Technology, ({ location }) => location, {
    nullable: true,
  })
    available_technology_id: number | Technology;

  @OneToMany(() => Comments, ({ location_id }) => location_id)
    comment: Comment[];

}
