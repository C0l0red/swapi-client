import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { Request } from 'express';
import { ValidateFilmIdGuard } from './guards/validate-film-id.guard';

@UseGuards(ValidateFilmIdGuard)
@Controller('films/:filmId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('filmId', ParseIntPipe) filmId: number,
    @Body() commentDto: CommentDto,
    @Req() request: Request,
  ) {
    commentDto.commenterIpAddress = request.ip;
    commentDto.filmId = filmId;
    return this.commentsService.create(commentDto);
  }

  @Get()
  findAllForFilm(@Param('filmId', ParseIntPipe) filmId: number) {
    return this.commentsService.findMany(filmId);
  }
}
