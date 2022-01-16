import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApplyQueryParamsInterceptor } from '../common/interceptors/apply-query-params.interceptor';
import { AddCommentCountInterceptor } from './interceptors/add-comment-count.interceptor';

// Handles requests to the Films endpoint
@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  // Responds with a list of Film Objects
  @UseInterceptors(AddCommentCountInterceptor, ApplyQueryParamsInterceptor)
  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  // Responds with a single Film Object
  @UseInterceptors(AddCommentCountInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmService.findOne(id);
  }
}
