import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmService.findOne(id);
  }
}
