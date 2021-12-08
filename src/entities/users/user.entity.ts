import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Comment } from '../localizations/comment.entity';

@Entity()
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

  @OneToMany(() => Comment, comment => comment.user)
    comment: Comment[];
}
