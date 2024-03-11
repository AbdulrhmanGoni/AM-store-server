import redisClient from "../configuration/redisClient.js";

export default async function cacheOrQuery(key, query, EX) {
    const data = await redisClient.get(key)
    if (data) {
        return JSON.parse(data)
    } else {
        const result = await query;
        if (result) {
            redisClient.set(key, JSON.stringify(result), { EX })
                .then(() => { })
                .catch(() => { })
        }
        return result;
    }
}
