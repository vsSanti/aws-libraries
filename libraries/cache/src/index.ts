import { Redis as RedisClient } from 'ioredis';
import { GenericObject } from '@vssanti/types';

import cacheClient from './cache.client';

export default class Cache {
  private client: RedisClient;

  constructor() {
    this.client = cacheClient;
  }

  /**
   * Disconnects redis client
   */
  disconnect(): void {
    this.client.disconnect();
  }

  private joinKeys(keys: string[]): string {
    return keys.join(':');
  }

  /**
   * Saves a valor (string or object) on Redis.
   * @param value Value to be saved.
   * @param keys Prefixes to turn into key.
   * @returns Promise with OK string.
   * @example
   * ```
   * // Saving string `value` on key `prefix:1`
   * cache.save('value', 'prefix', '1');
   *
   * // Saving object `{ any: 'thing' }` on key `prefix:2`
   * cache.save({ any: 'thing' }, 'prefix', '1');
   * ```
   */
  async save(value: string | GenericObject, ...keys: string[]): Promise<string | null> {
    const key = this.joinKeys(keys);

    return typeof value === 'string'
      ? this.client.set(key, value)
      : this.client.set(key, JSON.stringify(value));
  }

  /**
   * Save a value (string or object) on Redis with expiration time.
   * @param value Value to be saved.
   * @param time Time in seconds to expire value.
   * @param keys Prefixes to turn into key.
   * @returns Promise with OK string.
   * @example
   * ```
   * // Value with with expiration of 60 seconds for key `prefix:1`
   * cache.saveWithExpiration('value', 60, 'prefix', '1');
   * ```
   */
  async saveWithExpiration(
    value: string | GenericObject,
    time: number | string,
    ...keys: string[]
  ): Promise<string | null> {
    const key = this.joinKeys(keys);

    return typeof value === 'string'
      ? this.client.set(key, value, 'ex', time)
      : this.client.set(key, JSON.stringify(value), 'ex', time);
  }

  /**
   * Return a value from Redis based on informed prefix.
   * @param keys Prefixes to turn into key.
   * @returns Promise with a value found on Redis to the key.
   * @example
   * ```
   * // Searches value of key `prefix:1`
   * cache.recover('prefix', '1');
   * ```
   */
  async recover(...keys: string[]): Promise<GenericObject | string | undefined> {
    const key = this.joinKeys(keys);
    const data = await this.client.get(key);
    if (!data) return undefined;

    try {
      const parsedData = JSON.parse(data) as GenericObject;
      return parsedData;
    } catch (error) {
      return data;
    }
  }

  /**
   * Return all keys saved based on informed prefix.
   * @param keys Prefixes to turn into key.
   * @returns Promise with an array of string with found keys of prefix.
   * @example
   * ```
   * // Searches keys of prefix `prefix:1:*`
   * cache.recoverKeys('prefix', '1');
   * ```
   */
  async recoverKeys(...keys: string[]): Promise<string[]> {
    const key = this.joinKeys(keys);
    const pattern = `${key}:*`;

    const patternKeys = await this.client.scan(0, 'MATCH', pattern);

    return patternKeys[1];
  }

  /**
   * Excludes key and value from Redis based on informed key.
   * @param keys Prefixes to turn into key.
   * @example
   * ```
   * // Excludes key and value for key `prefix:1`
   * cache.invalidate('prefix', '1');
   * ```
   */
  async invalidate(...keys: string[]): Promise<void> {
    const key = this.joinKeys(keys);
    await this.client.del(key);
  }

  /**
   * Exclude all values on Redis for informed prefix.
   * @param keys Prefixes to turn into key.
   * @example
   * ```
   * // Searches and exclude keys for prefix `prefix:1:*`
   * cache.invalidatePrefix('prefix', '1');
   * ```
   */
  async invalidatePrefix(...keys: string[]): Promise<void> {
    const key = this.joinKeys(keys);

    const keysToDelete = await this.recoverKeys(key);

    const pipeline = this.client.pipeline();

    keysToDelete.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
