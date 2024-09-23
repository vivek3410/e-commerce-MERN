const dotenv = require('dotenv')

dotenv.config()

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    UPSTASH_REDIS_URL: process.env.UPSTASH_REDIS_URL,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
}

module.exports = config
