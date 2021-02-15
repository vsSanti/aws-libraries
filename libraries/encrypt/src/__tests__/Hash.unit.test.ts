import { Hash } from '../index';

describe('[ENCRYPT] Hash', () => {
  it('Should generate hash', async () => {
    const res = await Hash.generateHash('123456');
    const res2 = await Hash.generateHash('123456');

    expect(typeof res).toBe('string');
    expect(res).not.toBe(res2);
  });

  it('Should compare hashes', async () => {
    const hashedPassword = await Hash.generateHash('123456');
    const res = await Hash.compareHash('123456', hashedPassword);

    expect(res).toBe(true);
  });
});
