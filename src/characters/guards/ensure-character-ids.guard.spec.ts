import { EnsureCharacterIdsGuard } from './ensure-character-ids.guard';
import { of } from 'rxjs';
import { context, mockFilmsService } from '../../common/mocks';

describe('EnsureCharacterIdsGuard', () => {
  let guard: EnsureCharacterIdsGuard;

  const mockCharacterIds = [1, 2];

  beforeEach(() => {
    guard = new EnsureCharacterIdsGuard(mockFilmsService);
    mockFilmsService.getCharacterIds = jest.fn(() => of(mockCharacterIds));
  });

  describe('canActivate', () => {
    it('should call FilmService.getCharacterIds once', async () => {
      await guard.canActivate(context);
      expect(mockFilmsService.getCharacterIds).toHaveBeenCalledTimes(1);
    });

    it('should return true', async () => {
      const result = await guard.canActivate(context);
      expect(result).toBe(true);
    });
  });
});
