import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { of } from 'rxjs';
import { FilmsService } from '../films/films.service';
import { CommentDto } from '../comments/dto/comment.dto';
import { Repository } from 'typeorm';
import { Comment } from '../comments/entities/comment.entity';
import { CommentsService } from '../comments/comments.service';

export const request = {
  params: {},
  query: {},
} as unknown as Request;

export const getRequest = jest.fn(() => request);

export const switchToHttp = jest.fn(() => {
  return { getRequest: getRequest };
});

export const context = { switchToHttp } as unknown as ExecutionContext;

export const next: CallHandler = {
  handle: jest.fn(() => of([])),
};

export const mockHttpService = {
  get: jest.fn(() => of({ data: {} })),
};

export const mockCommentDto = { text: 'Loved it' } as CommentDto;

export const mockCharacter = { id: 1, name: 'Luke' };

export const mockFilm = {};

export const mockComment = { ...mockCommentDto, id: 1 } as Comment;

export const mockCharactersService = {
  findMany: jest.fn(() => [mockCharacter]),
  findOne: jest.fn(() => mockCharacter),
};

export const mockFilmsService = {
  getCharacterIds: jest.fn(() => of([])),
  findOne: jest.fn(() => of(mockFilm)),
  findAll: jest.fn(() => of([mockFilm])),
} as unknown as FilmsService;

export const mockCommentsService = {
  create: jest.fn().mockResolvedValue(mockComment),
  findMany: jest.fn().mockResolvedValue([mockComment]),
  getCountForFilm: jest.fn().mockResolvedValue(2),
} as unknown as CommentsService;

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export const mockRepositoryFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    create: jest.fn((entityDto) => Promise.resolve({ ...entityDto, id: 1 })),
    save: jest.fn((entity) => Promise.resolve(entity)),
    count: jest.fn().mockResolvedValue(1),
    createQueryBuilder: jest.fn(),
  }),
);
