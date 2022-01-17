import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  mockComment,
  mockCommentDto,
  MockType,
  mockRepositoryFactory,
} from '../common/mocks';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

describe('CommentsService', () => {
  let service: CommentsService;
  let mockRepository: MockType<Repository<Comment>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useFactory: mockRepositoryFactory,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    mockRepository = module.get(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call CommentRepository.create and save once', async () => {
      await service.create(mockCommentDto);

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should resolve to a Comment', async () => {
      await expect(service.create(mockCommentDto)).resolves.toEqual(
        mockComment,
      );
    });
  });

  describe('findMany', () => {
    const getMany = jest.fn().mockResolvedValue([mockComment]);
    const orderBy = jest.fn(() => ({ getMany }));
    const where = jest.fn(() => ({ orderBy }));

    beforeEach(() => {
      jest
        .spyOn(mockRepository, 'createQueryBuilder')
        .mockImplementation(() => ({ where }));
    });

    it('should call method chain', async () => {
      await service.findMany(1);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(where).toHaveBeenCalled();
      expect(orderBy).toHaveBeenCalled();
      expect(getMany).toHaveBeenCalled();
    });

    it('should resolve to an array of Comments', async () => {
      await expect(service.findMany(1)).resolves.toEqual([mockComment]);
    });
  });

  describe('getCountForFilm', () => {
    it('should call CommentRepository.count once', async () => {
      await service.getCountForFilm(1);

      expect(mockRepository.count).toHaveBeenCalledTimes(1);
    });

    it('should resolve to a number', async () => {
      await expect(service.getCountForFilm(1)).resolves.toEqual(1);
    });
  });
});
