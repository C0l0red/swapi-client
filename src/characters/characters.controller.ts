import {
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { EnsureCharacterIdsGuard } from './guards/ensure-character-ids.guard';
import { EnsureCharacterInFilmGuard } from './guards/ensure-character-in-film.guard';

@Controller('films/:filmId/characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  @UseGuards(EnsureCharacterIdsGuard)
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
