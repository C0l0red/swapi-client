import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { EnsureCharacterIdsGuard } from './guards/ensure-character-ids.guard';
import { AssertCharacterInFilmGuard } from './guards/assert-character-in-film.guard';
import { ApplyQueryParamsInterceptor } from '../common/interceptors/apply-query-params.interceptor';
import { AddExtraPropertiesInterceptor } from './interceptors/add-extra-properties.interceptor';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Gender } from '../common/enums/gender.enum';
import { CharacterIds } from './decorators/character-ids.decorator';

// Handles requests to the Characters endpoint
@ApiTags('characters')
@Controller('films/:filmId/characters')
export class CharactersController {
  constructor(private readonly characterService: CharactersService) {}

  // Responds with all Character Objects for Film with filmId
  @UseGuards(EnsureCharacterIdsGuard)
  @UseInterceptors(AddExtraPropertiesInterceptor, ApplyQueryParamsInterceptor)
  @ApiParam({ name: 'filmId' })
  @ApiQuery({ name: 'gender', enum: Gender, required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'order', required: false })
  @Get()
  findAllForFilm(@CharacterIds() characterIds: number[]) {
    return this.characterService.findMany(characterIds);
  }

  // Responds with a single Character Object with the ID passed if it exists in
  // the Film with filmId
  @ApiParam({ name: 'filmId' })
  @UseGuards(EnsureCharacterIdsGuard, AssertCharacterInFilmGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.characterService.findOne(id);
  }
}
