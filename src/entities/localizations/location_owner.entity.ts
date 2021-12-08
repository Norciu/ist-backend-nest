import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity({
  schema: 'localizations',
})
export class LocationOwner {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'smallint',
    default: null,
  })
    clientType: number;

  @Column({
    length: 50,
    default: null,
  })
    firstName: string;

  @Column({
    length: 50,
    default: null,
  })
    lastName: string;

  @Column({
    length: 100,
    default: null,
  })
    companyName: string;

  @Column({
    length: 20,
    default: null,
  })
    phoneNo: string;

  @Column({
    length: 100,
    default: null,
  })
    email: string;

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

  @CreateDateColumn({ type: 'timestamp' })
    updatedAt: number;

  @OneToMany(() => Location, location => location.location_owner)
    locationOwner: Location[];
}
