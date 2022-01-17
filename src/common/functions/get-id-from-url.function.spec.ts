import { getIdFromUrl } from './get-id-from-url.function';

describe('getIdFromUrl', () => {
  const url = 'https://swapi.py4e.com/api/people/3/';

  it('should return correct id', () => {
    expect(getIdFromUrl(url)).toBe(3);
  });

  it('should throw if URL is invalid', () => {
    const url = 'https://swapi.py4e.com/api/people/a/';
    expect(() => getIdFromUrl(url)).toThrow('Error getting Id from URL');
  });
});
