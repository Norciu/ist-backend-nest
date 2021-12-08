import {
  Column, CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from './location.entity';
import { User } from '../users/user.entity';

@Entity({
  schema: 'localizations',
})
export class Comment {

  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
    description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
    createdAt: Date;

  @ManyToOne(() => Location, location => location.comment)
    location: Location | number;

  @ManyToOne(() => User, user => user.comment)
    user: User | number;

}
