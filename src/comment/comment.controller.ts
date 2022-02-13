import { Controller, UseGuards, Put, Body, Res, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtPayload, User } from 'src/auth/jwt.strategy';
import { AddCommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {

  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Put('add')
  async addComment(@User() { id: user_id }: JwtPayload, @Body() { location_id, description }: AddCommentDto) {
    await this.commentService.addComment({ location_id, user_id, description });
    const [result, total] = await this.commentService.get(location_id);
    return { success: true, result, total };
  }

  @Get('get/:location_id')
  async get(@Param('location_id') location_id) {
    const [result, total] = await this.commentService.get(location_id);
    return { success: true, result, total };
  }

}
