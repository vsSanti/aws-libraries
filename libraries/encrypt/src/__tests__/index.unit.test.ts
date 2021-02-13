import Encrypt from '../index';

describe('[ENCRYPT] index', () => {
  it('Should generate hash', async () => {
    const res = await Encrypt.generateHash('123456');
    const res2 = await Encrypt.generateHash('123456');

    expect(typeof res).toBe('string');
    expect(res).not.toBe(res2);
  });

  it('Should compare hashes', async () => {
    const hashedPassword = await Encrypt.generateHash('123456');
    const res = await Encrypt.compareHash('123456', hashedPassword);

    expect(res).toBe(true);
  });
});
