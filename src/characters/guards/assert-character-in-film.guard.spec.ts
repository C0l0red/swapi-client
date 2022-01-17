import { AssertCharacterInFilmGuard } from './assert-character-in-film.guard';
import { context, getRequest, request, switchToHttp } from '../../common/mocks';

describe('AssertCharacterInFilmGuard', () => {
  let guard: AssertCharacterInFilmGuard;

  beforeEach(() => {
    guard = new AssertCharacterInFilmGuard();
    request.params.characterIds = '1,2,3';
    request.params.id = '1';
  });

  describe('canActivate', () => {
    it('should call switchToHttp and getRequest once', () => {
      guard.canActivate(context);

      expect(switchToHttp).toHaveBeenCalledTimes(1);
      expect(getRequest).toHaveBeenCalledTimes(1);
    });

    it('should return true if character in film', () => {
      expect(guard.canActivate(context)).toBe(true);
    });

    it('should throw if character not in film', () => {
      request.params.id = '0';
      expect(() => guard.canActivate(context)).toThrow(
        'Character is not in film',
      );
    });
  });
});
