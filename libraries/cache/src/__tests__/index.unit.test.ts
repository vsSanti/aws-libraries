import Cache from '../index';

const cache = new Cache();

describe('[REDIS] new index', () => {
  afterAll(async (done) => {
    await cache.invalidatePrefix('*');
    cache.disconnect();

    done();
  });

  it('Should save and recover strings, with and without expiration time', async () => {
    await cache.save('value1', 'prefix', '1');
    await cache.save('value2', 'prefix', '2');

    await cache.saveWithExpiration('value3', 5, 'prefix', '3');
    await cache.saveWithExpiration('value4', 5, 'prefix', '4');

    const res1 = await cache.recover('prefix', '1');
    const res2 = await cache.recover('prefix', '2');
    const res3 = await cache.recover('prefix', '3');
    const res4 = await cache.recover('prefix', '4');

    expect(res1).toBe('value1');
    expect(res2).toBe('value2');
    expect(res3).toBe('value3');
    expect(res4).toBe('value4');
  });

  it('Should save and recover objects, with and without expiration time', async () => {
    await cache.save({ any: 'thing1' }, 'prefix', '1');
    await cache.save({ any: 'thing2' }, 'prefix', '2');

    await cache.saveWithExpiration({ any: 'thing3' }, 5, 'prefix', '3');
    await cache.saveWithExpiration({ any: 'thing4' }, 5, 'prefix', '4');

    const res1 = (await cache.recover('prefix', '1')) as { any: string };
    const res2 = (await cache.recover('prefix', '2')) as { any: string };
    const res3 = (await cache.recover('prefix', '3')) as { any: string };
    const res4 = (await cache.recover('prefix', '4')) as { any: string };

    expect(res1.any).toBe('thing1');
    expect(res2.any).toBe('thing2');
    expect(res3.any).toBe('thing3');
    expect(res4.any).toBe('thing4');
  });

  it('Should return undefined if nothing is recovered', async () => {
    const res = await cache.recover('nonExistingPrefix');

    expect(res).toBe(undefined);
  });

  it('Should recover all keys from prefixes', async () => {
    await cache.save('value1', 'prefix1', 'prefix2', '1');
    await cache.save('value2', 'prefix1', 'prefix2', '2');
    await cache.save('value3', 'prefix1', 'prefix2', '3');
    await cache.save('value4', 'prefix1', 'prefix2', '4');

    const keys = await cache.recoverKeys('prefix1', 'prefix2');

    expect(keys.length).toBe(4);
  });

  it('Should invalidate key', async () => {
    await cache.save('value', 'key', 'to', 'delete');

    const resBeforeInvalidate = await cache.recover('key', 'to', 'delete');
    await cache.invalidate('key', 'to', 'delete');
    const resAfterInvalidate = await cache.recover('key', 'to', 'delete');

    expect(resBeforeInvalidate).toBe('value');
    expect(resAfterInvalidate).toBe(undefined);
  });

  it('Should invalidate a prefix', async () => {
    await cache.save('value1', 'prefix', 'to', 'invalidate', '1');
    await cache.save('value2', 'prefix', 'to', 'invalidate', '2');

    const value1 = await cache.recover('prefix', 'to', 'invalidate', '1');
    const value2 = await cache.recover('prefix', 'to', 'invalidate', '2');

    await cache.invalidatePrefix('prefix', 'to', 'invalidate');

    const deletedValue1 = await cache.recover('prefix', 'to', 'invalidate', '1');
    const deletedValue2 = await cache.recover('prefix', 'to', 'invalidate', '2');

    expect(value1).toBe('value1');
    expect(value2).toBe('value2');

    expect(deletedValue1).toBe(undefined);
    expect(deletedValue2).toBe(undefined);
  });
});
