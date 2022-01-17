import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { EnsureCharacterIdsGuard } from './guards/ensure-character-ids.guard';
import { AddExtraPropertiesInterceptor } from './interceptors/add-extra-properties.interceptor';
import { ApplyQueryParamsInterceptor } from '../common/interceptors/apply-query-params.interceptor';
import { AssertCharacterInFilmGuard } from './guards/assert-character-in-film.guard';
import { mockCharacter, mockCharactersService } from '../common/mocks';

describe('CharacterController', () => {
  let controller: CharactersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharactersService],
    })
      .overrideProvider(CharactersService)
      .useValue(mockCharactersService)
      .overrideGuard(EnsureCharacterIdsGuard)
      .useValue({})
      .overrideInterceptor(AddExtraPropertiesInterceptor)
      .useValue({})
      .overrideInterceptor(ApplyQueryParamsInterceptor)
      .useValue({})
      .overrideGuard(AssertCharacterInFilmGuard)
      .useValue({})
      .compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should call characterService.findOne once', () => {
      controller.findOne(1);
      expect(mockCharactersService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return a character', () => {
      expect(controller.findOne(1)).toBe(mockCharacter);
    });
  });

  describe('findAllForFilm', () => {
    it('should return an array of characters', () => {
      expect(controller.findAllForFilm([1, 2])).toEqual([mockCharacter]);
    });
  });
});
