import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Comments } from '../localizations/comment.entity';

@Entity({
  schema: 'account',
})
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    nullable: false,
    length: 50,
    unique: true,
  })
    username: string;

  @Column({
    nullable: false,
    length: 50,
  })
    firstName: string;

  @Column({
    nullable: false,
    length: 50,
  })
    lastName: string;

  @Column({
    nullable: false,
  })
    password: string;

  @Column({
    length: 15,
    default: null,
  })
    phoneNo: string;

  @Column({
    default: null,
    unique: true,
  })
    email: string;

  @Column({
    default: null,
  })
    verificationToken: string;

  @Column({
    default: false,
  })
    disabled: boolean;

  @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

  @CreateDateColumn({ type: 'timestamp' })
    updatedAt: number;

  @OneToMany(() => Comments, ({ user_id }) => user_id)
    comments: Comment[];
}
