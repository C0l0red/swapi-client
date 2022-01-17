import { AddCommentCountInterceptor } from './add-comment-count.interceptor';
import {
  context,
  mockCommentsService,
  mockFilm,
  next,
} from '../../common/mocks';
import { lastValueFrom, of } from 'rxjs';

describe('AddCommentCountInterceptor', () => {
  let interceptor: AddCommentCountInterceptor;

  beforeEach(() => {
    interceptor = new AddCommentCountInterceptor(mockCommentsService);
    next.handle = jest.fn(() => of(mockFilm));
  });

  describe('intercept', () => {
    it('calls CommentService.getCountForFilm once', async () => {
      await lastValueFrom(interceptor.intercept(context, next));

      expect(mockCommentsService.getCountForFilm).toHaveBeenCalledTimes(1);
    });

    it('adds commentCount to response object', async () => {
      const response = await lastValueFrom(
        interceptor.intercept(context, next),
      );
      expect(response).toEqual({ commentCount: 2 });
    });
  });
});
