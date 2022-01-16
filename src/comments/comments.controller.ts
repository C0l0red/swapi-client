import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { Request } from 'express';
import { ValidateFilmIdGuard } from './guards/validate-film-id.guard';
import { getIpAddressFromRequest } from '../common/functions/get-ip-address-from-request.function';
import { ApplyQueryParamsInterceptor } from '../common/interceptors/apply-query-params.interceptor';
import { ApiTags } from '@nestjs/swagger';

// Handles requests to the Comments endpoint
@ApiTags('comments')
@UseGuards(ValidateFilmIdGuard)
@Controller('films/:filmId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Creates a Comment for a Film with filmId, attaches the commenter's IP address
  @Post()
  create(
    @Param('filmId', ParseIntPipe) filmId: number,
    @Body() commentDto: CommentDto,
    @Req() request: Request,
  ) {
    commentDto.commenterIpAddress = getIpAddressFromRequest(request);
    commentDto.filmId = filmId;
    return this.commentsService.create(commentDto);
  }

  // Responds with all Comments made for a Film with filmId
  @UseInterceptors(ApplyQueryParamsInterceptor)
  @Get()
  findAllForFilm(@Param('filmId', ParseIntPipe) filmId: number) {
    return this.commentsService.findMany(filmId);
  }
}
