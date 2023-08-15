import RedisStore from "connect-redis"
import {createClient} from "redis"

let redisClient = createClient({
  url: 'redis://redis:6379',
  // pass: 'your-redis-password', 
})

const connectRedis = () => {
    try {
        redisClient.connect()
        console.log('Connected to Redis')
    } catch (error) {
        console.error(error)
        console.error('Failed to connect to Redis')
        console.error(error)
    }
}

const options = {
  client: redisClient,
  prefix: 'myapp:', 
  ttl: 3600, // Session expiration in seconds (1 hour)
  db: 0,
};

let redisStore = new RedisStore(options)

module.exports = {
    connectRedis,
    redisStore,
}
