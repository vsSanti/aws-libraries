import Redis, { Redis as RedisClient } from 'ioredis';

const client: RedisClient = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: Number(process.env.REDIS_PORT) || 6379,
  db: Number(process.env.REDIS_DATABASE) || 0,
});

export default client;
