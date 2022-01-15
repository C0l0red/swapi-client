import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApplyQueryParamsInterceptor } from '../common/interceptors/apply-query-params.interceptor';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @UseInterceptors(ApplyQueryParamsInterceptor)
  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmService.findOne(id);
  }
}
