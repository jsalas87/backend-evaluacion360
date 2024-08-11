const expressRedisCache = require('express-redis-cache')
const dotenv = require('dotenv');

dotenv.config();

const cache = expressRedisCache({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    expire: Number(process.env.REDIS_EXPIRE)
  });

module.exports = cache;