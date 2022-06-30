import { jest, describe, it, expect } from '@jest/globals';
import mockJwt from 'jsonwebtoken';

import { generateToken } from './generateToken';

jest.mock('jsonwebtoken');
describe('generateToken() ', () => {
  it('should call generateToken() and return a token', async () => {
    const user = {
      _id: 'some id',
      username: 'username',
      email: 'email',
      isAdmin: false
    };

    mockJwt.sign.mockResolvedValue('accessToken');
    const result = await generateToken(user);
    expect(mockJwt.sign).toHaveBeenCalled();
    expect(result).toBe('accessToken');
  });
  it('should call generaToken() and throw an Error', async () => {
    const user = {
      _id: 'some id',
      username: 'username',
      email: 'email',
      isAdmin: false
    };
    mockJwt.sign.mockResolvedValue(() => {
      throw new Error('error message');
    });
    const result = await generateToken(user);
    expect(mockJwt.sign).toHaveBeenCalled();
    expect(result).toThrowError();
  });
});
