import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { ValidateFilmIdGuard } from './guards/validate-film-id.guard';
import { ApplyQueryParamsInterceptor } from '../common/interceptors/apply-query-params.interceptor';
import { CommentsService } from './comments.service';
import {
  mockComment,
  mockCommentDto,
  mockCommentsService,
  request,
} from '../common/mocks';
import { getIpAddressFromRequest } from '../common/functions/get-ip-address-from-request.function';

jest.mock('../common/functions/get-ip-address-from-request.function', () => ({
  getIpAddressFromRequest: jest.fn(() => ''),
}));

describe('CommentsController', () => {
  let controller: CommentsController;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService],
      controllers: [CommentsController],
    })
      .overrideProvider(CommentsService)
      .useValue(mockCommentsService)
      .overrideGuard(ValidateFilmIdGuard)
      .useValue({})
      .overrideInterceptor(ApplyQueryParamsInterceptor)
      .useValue({})
      .compile();

    controller = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call getIpAddressFromRequest once', async () => {
      await controller.create(1, mockCommentDto, request);

      expect(getIpAddressFromRequest).toHaveBeenCalledTimes(1);
    });

    it('should resolve to a Comment', async () => {
      await expect(controller.create(1, mockCommentDto, request)).resolves.toBe(
        mockComment,
      );
    });

    it('should call CommentsService.create once', async () => {
      await controller.create(1, mockCommentDto, request);

      expect(commentsService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllForFilm', () => {
    it('should call CommentService.findMany once', async () => {
      await controller.findAllForFilm(1);

      expect(commentsService.findMany).toHaveBeenCalledTimes(1);
    });

    it('should resolve to an array of Comments', async () => {
      await expect(controller.findAllForFilm(1)).resolves.toEqual([
        mockComment,
      ]);
    });
  });
});
