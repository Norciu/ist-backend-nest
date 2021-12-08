import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Technology } from './technology.entity';
import { Street } from './street.entity';
import { City } from './city.entity';
import { LocationOwner } from './location_owner.entity';
import { Comment } from './comment.entity';

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

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

  @CreateDateColumn({ type: 'timestamp' })
    updatedAt: number;

  @ManyToOne(() => LocationOwner, locationOwner => locationOwner.locationOwner)
    location_owner: LocationOwner;

  @ManyToOne(() => Street, (street) => street.locations, {
    nullable: false,
  })
    street: Street;

  @ManyToOne(() => City, (city) => city.locations, {
    nullable: false,
  })
    city: City;

  @ManyToOne(() => Technology, (technology) => technology.location, {
    nullable: false,
  })
    availableTechnology: Technology;

  @OneToMany(() => Comment, ({ location }) => location)
    comment: Comment[];
}
