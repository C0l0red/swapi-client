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
import { AssertCharacterInFilmGuard } from './guards/assert-character-in-film.guard';
import { ApplyQueryParamsInterceptor } from '../common/interceptors/apply-query-params.interceptor';

// Handles requests to the Characters endpoint
@Controller('films/:filmId/characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  // Responds with all Character Objects for Film with filmId
  @UseGuards(EnsureCharacterIdsGuard)
  @UseInterceptors(ApplyQueryParamsInterceptor)
  @Get()
  findAllForFilm(
    @Param('characterIds', ParseArrayPipe) characterIdStrings: string[],
  ) {
    const characterIds: number[] = characterIdStrings.map((id) => parseInt(id));
    return this.characterService.findMany(characterIds);
  }

  // Responds with a single Character Object with the ID passed if it exists in
  // the Film with filmId
  @UseGuards(EnsureCharacterIdsGuard, AssertCharacterInFilmGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.characterService.findOne(id);
  }
}
