import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { AddCommentCountInterceptor } from './interceptors/add-comment-count.interceptor';
import { ApplyQueryParamsInterceptor } from '../common/interceptors/apply-query-params.interceptor';
import { FilmsService } from './films.service';
import { mockFilm, mockFilmsService } from '../common/mocks';
import { lastValueFrom } from 'rxjs';

describe('FilmController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService],
      controllers: [FilmsController],
    })
      .overrideProvider(FilmsService)
      .useValue(mockFilmsService)
      .overrideInterceptor(AddCommentCountInterceptor)
      .useValue({})
      .overrideInterceptor(ApplyQueryParamsInterceptor)
      .useValue({})
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call FilmsService.findAll once', async () => {
      await lastValueFrom(controller.findAll());

      expect(filmsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an Observable array of Film', async () => {
      const result = await lastValueFrom(controller.findAll());

      expect(result).toEqual([mockFilm]);
    });
  });

  describe('findOne', () => {
    it('should call FilmsService.findOne once', async () => {
      await lastValueFrom(controller.findOne(1));

      expect(filmsService.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return an Observable Film', async () => {
      const result = await lastValueFrom(controller.findOne(1));

      expect(result).toEqual(mockFilm);
    });
  });
});
