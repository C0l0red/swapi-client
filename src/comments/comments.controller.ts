import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { Request } from 'express';

@Controller('films/:filmId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() commentDto: CommentDto, @Req() request: Request) {
    console.log(request.ip);
    return request.ip;
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }
}
