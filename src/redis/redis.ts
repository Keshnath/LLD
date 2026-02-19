import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;

export const connectRedis = async (): Promise<RedisClientType> => {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });

    redisClient.on("error", (err: Error) =>
      console.log("Redis Client Error", err)
    );

    redisClient.on("connect", () => console.log("Connected to Redis"));

    await redisClient.connect();
  }

  return redisClient;
};

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error("Redis client is not connected. Call connectRedis first.");
  }
  return redisClient;
};
