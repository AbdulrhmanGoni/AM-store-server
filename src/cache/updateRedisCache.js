import redisClient from "../configuration/redisClient.js";

export default async function updateRedisCache(key, updateFunction, options) {
    const currentData = await redisClient.get(key);
    const updatedData = updateFunction(JSON.parse(currentData));
    return await redisClient.set(key, JSON.stringify(updatedData), options)
        .then(() => true)
        .catch(() => false)
}
