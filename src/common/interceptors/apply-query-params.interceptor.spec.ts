import { ApplyQueryParamsInterceptor } from './apply-query-params.interceptor';
import { context, mockComment, next, request } from '../mocks';
import { lastValueFrom, of } from 'rxjs';

describe('ApplyQueryParamsInterceptor', () => {
  let interceptor: ApplyQueryParamsInterceptor;
  const responseFromHandle = [{ ...mockComment, id: 2 }, mockComment];

  beforeEach(() => {
    interceptor = new ApplyQueryParamsInterceptor();
  });

  describe('intercept', () => {
    beforeEach(() => {
      next.handle = jest.fn(() => of(responseFromHandle));
      jest
        .spyOn(interceptor, 'applySort')
        .mockImplementation(() => responseFromHandle);

      jest
        .spyOn(interceptor, 'applyFilter')
        .mockImplementation(() => responseFromHandle);
    });

    it('should call applySort and applyFilter once each', async () => {
      await lastValueFrom(interceptor.intercept(context, next));

      expect(interceptor.applySort).toHaveBeenCalledTimes(1);
      expect(interceptor.applyFilter).toHaveBeenCalledTimes(1);
    });

    it('should return an Observable of same type passed', async () => {
      const result = await lastValueFrom(interceptor.intercept(context, next));

      expect(result).toEqual(responseFromHandle);
    });
  });

  describe('applyFilter', () => {
    it('should return unfiltered response on invalid filter key', () => {
      expect(interceptor.applyFilter(request, [...responseFromHandle])).toEqual(
        responseFromHandle,
      );
    });

    it('should filter response on valid filter key', () => {
      request.query.id = '1';
      expect(interceptor.applyFilter(request, [...responseFromHandle])).toEqual(
        [mockComment],
      );
    });
  });

  describe('applySort', () => {
    it('should return unsorted response on missing sort value', () => {
      expect(interceptor.applySort(request, [...responseFromHandle])).toEqual(
        responseFromHandle,
      );
    });

    it('should return unsorted response on invalid sort value', () => {
      request.query.sort = 'poll';
      expect(interceptor.applySort(request, [...responseFromHandle])).toEqual(
        responseFromHandle,
      );
    });

    it('should use ascending order if not specified', () => {
      request.query.sort = 'id';
      expect(interceptor.applySort(request, [...responseFromHandle])).toEqual(
        [...responseFromHandle].reverse(),
      );
    });

    it('should apply sort and order parameters', () => {
      request.query.sort = 'id';
      request.query.order = 'desc';

      expect(interceptor.applySort(request, [...responseFromHandle])).toEqual([
        ...responseFromHandle,
      ]);
    });
  });
});
