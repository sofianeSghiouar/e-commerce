import { generateToken } from './generateToken';
import mockJwt from 'jsonwebtoken';
import { jest, describe, it, expect } from '@jest/globals';
jest.mock('jsonwebtoken');
describe('generateToken()', () => {
  it('should call generaToken function', async () => {
    const user = {
      _id: 'some id',
      username: 'username',
      email: 'email',
      isAdmin: false
    };
    mockJwt.sign.mockResolvedValue('accessToken');
    const result = await generateToken(user);
    console.log('token :>> ', result);
    expect(mockJwt.sign).toHaveBeenCalled();
    expect(result).toBe('accessToken');
  });
  it('should call generaToken function and throw an Error', async () => {
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
    console.log('result 2:>> ', result);
    expect(mockJwt.sign).toHaveBeenCalled();
    expect(result).toThrowError();
  });
});
