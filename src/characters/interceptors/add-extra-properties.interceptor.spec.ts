import { AddExtraPropertiesInterceptor } from './add-extra-properties.interceptor';
import { of } from 'rxjs';
import { context, next } from '../../common/mocks';

describe('AddExtraPropertiesInterceptor', () => {
  let interceptor: AddExtraPropertiesInterceptor;

  const character = { height: 50 };

  beforeEach(() => {
    interceptor = new AddExtraPropertiesInterceptor();
    next.handle = jest.fn(() => of([character, character]));
  });

  describe('intercept', () => {
    it('should return an Observable of current object', () => {
      interceptor.intercept(context, next).subscribe((res) => {
        expect(res).toMatchObject({
          characters: [{ height: 50 }, { height: 50 }],
          count: 2,
          totalHeightInCm: '100 cm',
          totalHeightInFeet: '3 ft 3 inches',
        });
      });
    });
  });
});
