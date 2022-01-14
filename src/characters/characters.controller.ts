import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharacterIdsPipe } from './pipes/character-ids.pipe';
import { combineLatestAll, map, Observable } from 'rxjs';

@Controller('films/:filmId/characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  @Get()
  findAllForFilm(
    @Param('filmId', CharacterIdsPipe) characterIds: Observable<number[]>,
  ) {
    return characterIds
      .pipe(map((ids) => this.characterService.findMany(ids)))
      .pipe(combineLatestAll())
      .pipe(map((nestedArray) => nestedArray.flat()));
  }

  @Get(':characterId')
  findOne(
    @Param('filmId', CharacterIdsPipe) characterIds: Observable<number[]>,
    @Param('characterId', ParseIntPipe) characterId: number,
  ) {
    return characterIds
      .pipe(
        map((characterIds) => {
          if (!characterIds.includes(characterId)) {
            throw new HttpException('Id not in characters Ids', 400);
          }
        }),
        map(() => this.characterService.findOne(characterId)),
      )
      .pipe(combineLatestAll());
  }
}
