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
export class Comments {

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
    created_at: Date;

  @ManyToOne(() => Location, ({ comment }) => comment)
    location_id: number;

  @ManyToOne(() => User, ({ comments }) => comments)
    user_id: number;
}
