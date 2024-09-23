const Redis = require('ioredis');
const config = require('./env-variables');

const redis = new Redis(config.UPSTASH_REDIS_URL);


module.exports = redis
