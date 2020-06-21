import session from 'express-session';
import redis from 'redis';

const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
});

export default new RedisStore({ client: redisClient });
