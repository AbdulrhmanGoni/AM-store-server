import { createClient } from 'redis';

let redisClient;

if (process.env.REDIS_CONNECTION_TYPE === "remote") {
    redisClient = createClient({
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USERNAME,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });
}
else if (process.env.NODE_ENV === "production") {
    redisClient = createClient({ url: "redis://redis-prod" });
}
else if (process.env.NODE_ENV === "development") {
    redisClient = createClient({ url: "redis://redis-dev" });
}
else {
    redisClient = createClient();
}

export async function redisClientConnection() {
    try {
        await redisClient.connect();
        console.log("Connected to Redis successfully")
    } catch (e) {
        console.log("Redis connection error", e.message)
    }
}

export default redisClient;