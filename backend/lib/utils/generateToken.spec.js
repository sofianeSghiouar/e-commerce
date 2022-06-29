import { generateToken } from './generateToken';
import jwt from 'jsonwebtoken';
import { jest, describe, it, expect } from '@jest/globals';
jest.mock('jsonwebtoken'); // jest.mock('jsonwebtoken', () => ({
//   ...jest.requireActual('jsonwebtoken'), // import and retain the original functionalities
//   sign: jest.fn().mockReturnValue('fakeToken') // overwrite sign
// }));

describe('generateToken()', () => {
  it('should call generaToken function', async () => {
    const user = {
      _id: 'some id',
      username: 'username',
      email: 'email',
      isAdmin: false
    };
    jwt.sign.mockResolvedValue('accessToken');
    const result = await generateToken(user);
    console.log('token :>> ', result);
    expect(jwt.sign).toHaveBeenCalled();
    expect(result).toBe('accessToken');
  });
  it('should call generaToken function and throw an Error', async () => {
    const user = {
      _id: 'some id',
      username: 'username',
      email: 'email',
      isAdmin: false
    };
    jwt.sign.mockResolvedValue(() => {
      throw new Error();
    });
    const result = await generateToken(user);
    console.log('result 2:>> ', result);
    expect(jwt.sign).toHaveBeenCalled();
    expect(result).toThrowError();
  });
});
