import { Controller, UseGuards, Put, Body, Res, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddCommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {

  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Put('add')
  async addComment(@Body() body: AddCommentDto, @Res() res) {
    const result = this.commentService.addComment(body);
    return res.status(200).send({ success: true, result });
  }

  @Get('get/:location_id')
  async get(@Param('location_id') location_id, @Res() res) {
    const result = await this.commentService.get(location_id);
    return res.status(200).send({ success: true, result });
  }

}
