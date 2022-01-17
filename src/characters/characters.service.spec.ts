import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import Character from './entities/character.entity';
import { mockHttpService } from '../common/mocks';
import { lastValueFrom, of } from 'rxjs';

jest.mock('./entities/character.entity');

describe('CharacterService', () => {
  let service: CharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CharactersService],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should call httpService.get once', () => {
      service.findOne(1);
      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
    });

    it('should return an Observable Character', () => {
      service.findOne(1).subscribe((res) => {
        expect(res).toEqual(new Character({}));
      });
    });
  });

  describe('findMany', () => {
    it('should call CharacterService.findOne once', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => of(new Character({})));

      await lastValueFrom(service.findMany([1]));

      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return an array of Observable Characters', () => {
      service.findMany([1]).subscribe((res) => {
        expect(res).toEqual([new Character({})]);
      });
    });
  });
});
