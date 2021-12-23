import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comments } from 'src/entities/localizations/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
