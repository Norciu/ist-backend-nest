import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { setEntityProperty } from 'src/utils/entity_serializer';
import { Comments } from 'src/entities/localizations/comment.entity';
import { Repository,  } from 'typeorm';
import { AddCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comments) private readonly comment_repo: Repository<Comments>,
  ) {}

  async addComment(comment: { location_id: number, user_id: number, description: string }) {
    const com = setEntityProperty(new Comments(), comment);
    return this.comment_repo.save(com);
  }

  async get(location_id: number) {
    const builder = this.comment_repo.createQueryBuilder('comments')
      .select("comments.id, concat(first_name, ' ', last_name) AS user_name, comments.created_at, description")
      .leftJoin('user', 'u', 'u.id = comments.user_id')
      .where('comments.location_id = :location_id', { location_id })
      .orderBy('comments.created_at');

      const result = await builder.getRawMany();
      const total = await builder.getCount();

      return [ result, total ];
  }
}
