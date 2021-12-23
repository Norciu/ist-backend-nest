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
    client_type: number;

  @Column({
    length: 50,
    default: null,
  })
    first_name: string;

  @Column({
    length: 50,
    default: null,
  })
    last_name: string;

  @Column({
    length: 100,
    default: null,
  })
    company_name: string;

  @Column({
    length: 20,
    default: null,
  })
    phone_no: string;

  @Column({
    length: 100,
    default: null,
  })
    email: string;

  @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date;

  @OneToMany(() => Location, ({ location_owner_id }) => location_owner_id)
    location_owner: Location[];
}
