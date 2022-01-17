import { request } from '../mocks';
import { getIpAddressFromRequest } from './get-ip-address-from-request.function';

describe('getIpAddressFromRequest', () => {
  const ip = '127.0.0.1';

  beforeAll(() => {
    request.ip = `f:f:f:${ip}`;
  });

  it('should return IP Address', () => {
    expect(getIpAddressFromRequest(request)).toEqual(ip);
  });

  it('should throw if no IP Address', () => {
    request.ip = 'invalid string';

    expect(() => getIpAddressFromRequest(request)).toThrow(
      'Unable to obtain IP Address',
    );
  });
});
