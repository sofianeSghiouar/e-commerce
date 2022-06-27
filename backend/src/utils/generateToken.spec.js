import { generateToken } from './generateToken';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('./generateToken.js');
describe('generateToken()', () => {
  beforeEach(() => {
    generateToken.mockClear();
  });
  it('should call generaToken function', async () => {
    const user = {
      _id: 'some id',
      username: 'username',
      email: 'email',
      isAdmin: false
    };
    generateToken.mockResolvedValue('fakeToken');
    const result = await generateToken(user);
    console.log('result', result);
    expect(generateToken).toHaveBeenCalled();
    expect(generateToken).toHaveBeenCalledWith(user);
    expect(result).toBe('fakeToken');
  });
  //   it('should generate an error when call generaToken function', async () => {
  //     expect(result).not.toBe('fakeToken');
  //     const user = {
  //       _id: 'some id',
  //       username: 'username',
  //       email: 'email',
  //       isAdmin: false
  //     };
  //     generateToken.mockResolvedValue(() => {
  //       throw new Error('fakeError');
  //     });
  //     const result = await generateToken(user);
  //     console.log('result', result());
  //     expect(generateToken).toHaveBeenCalled();
  //     expect(generateToken).toHaveBeenCalledWith(user);
  //     expect(result).toThrow();

  //   });
});
