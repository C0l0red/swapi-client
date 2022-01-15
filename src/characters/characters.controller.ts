import {
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { EnsureCharacterIdsGuard } from './guards/ensure-character-ids.guard';
import { EnsureCharacterInFilmGuard } from './guards/ensure-character-in-film.guard';
import { ApplyQueryParamsInterceptor } from '../common/interceptors/apply-query-params.interceptor';

@Controller('films/:filmId/characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  @UseGuards(EnsureCharacterIdsGuard)
  @UseInterceptors(ApplyQueryParamsInterceptor)
  @Get()
  findAllForFilm(
    @Param('characterIds', ParseArrayPipe) characterIdStrings: string[],
  ) {
    const characterIds: number[] = characterIdStrings.map((id) => parseInt(id));
    return this.characterService.findMany(characterIds);
  }

  @UseGuards(EnsureCharacterIdsGuard, EnsureCharacterInFilmGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.characterService.findOne(id);
  }
}
