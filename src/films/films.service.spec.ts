import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { mockFilm, mockHttpService } from '../common/mocks';
import { Film } from './entities/film.entity';
import { lastValueFrom, of } from 'rxjs';

jest.mock('./entities/film.entity');

describe('FilmService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FilmsService],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    beforeEach(() => {
      mockHttpService.get = jest.fn(() =>
        of({ data: { results: [mockFilm] } }),
      );
    });

    it('should call HttpService.get once', async () => {
      await lastValueFrom(service.findAll());

      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
    });

    it('should return an Observable array of Films', async () => {
      const result = await lastValueFrom(service.findAll());

      expect(result).toEqual([new Film({})]);
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      mockHttpService.get = jest.fn(() => of({ data: mockFilm }));
    });

    it('should call HttpService.get once', async () => {
      await lastValueFrom(service.findOne(1));

      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
    });

    it('should return an Observable Film', async () => {
      const result = await lastValueFrom(service.findOne(1));

      expect(result).toEqual(new Film({}));
    });
  });
});
