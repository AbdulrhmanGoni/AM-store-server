import { createClient } from 'redis';

let redisClient;

if (process.env.NODE_ENV === "jest-testing") {
    redisClient = createClient()
} else {
    redisClient = createClient({
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USERNAME,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });
}

redisClient.connect()
    .then(() => console.log("connected to Redis successfully"))
    .catch((e) => console.log("Redis connection error", e.message));

export default redisClient;