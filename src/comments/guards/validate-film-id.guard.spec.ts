import { ValidateFilmIdGuard } from './validate-film-id.guard';
import { context, mockFilmsService, request } from '../../common/mocks';

describe('ValidateFilmIdGuard', () => {
  let guard: ValidateFilmIdGuard;

  beforeEach(() => {
    guard = new ValidateFilmIdGuard(mockFilmsService);
    request.params.filmId = '1';
  });

  it('should return true', async () => {
    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw if filmId isNaN', async () => {
    request.params.filmId = 'a';
    await expect(guard.canActivate(context)).rejects.toThrow('not a number');
  });
});
