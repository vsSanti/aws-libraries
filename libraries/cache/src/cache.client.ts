import Redis, { Redis as RedisClient } from 'ioredis';
import RedisMock from 'ioredis-mock';

let client: RedisClient;

if (process.env.JEST_WORKER_ID) {
  client = new RedisMock();
} else {
  client = new Redis({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT) || 6379,
    db: 0,
  });
}

export default client;
