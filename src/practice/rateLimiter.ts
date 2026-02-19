import { Request, Response, NextFunction } from "express";
import { getRedisClient } from "../redis/redis"
import { v4 as uuidv4 } from "uuid";

/* ---------------- FIXED WINDOW LIMITER ---------------- */
export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const ip = req.ip;
    const redisClient = getRedisClient();

    const RATE_LIMIT = 5;
    const WINDOW_SIZE_IN_SECONDS = 60;
    const redisKey = `rate_limit:${ip}`;

    const currentRequests = await redisClient.incr(redisKey);

    if (currentRequests === 1) {
      await redisClient.expire(redisKey, WINDOW_SIZE_IN_SECONDS);
    }

    if (currentRequests > RATE_LIMIT) {
      res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
      return;
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    next();
  }
};

/* ---------------- SLIDING WINDOW LIMITER ---------------- */
export const slidingWindowRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const redisClient = getRedisClient();
    const ip = req.ip;

    const WINDOW_SIZE = 60;
    const MAX_REQUESTS = 5;

    const key = `rate_limit:sliding:${ip}`;
    const now = Date.now();
    const windowStart = now - WINDOW_SIZE * 1000;

    await redisClient.zRemRangeByScore(key, 0, windowStart);

    const requestCount = await redisClient.zCard(key);

    if (requestCount >= MAX_REQUESTS) {
      res.status(429).json({
        message: "Too many requests. Try again later.",
      });
      return;
    }

    await redisClient.zAdd(key, {
      score: now,
      value: uuidv4(),
    });

    await redisClient.expire(key, WINDOW_SIZE);

    next();
  } catch (err) {
    console.error("Sliding window rate limiter error:", err);
    next();
  }
};

/* ---------------- TOKEN BUCKET LIMITER ---------------- */
export const tokenBucketRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const redisClient = getRedisClient();
    const ip = req.ip;

    const CAPACITY = 5;
    const REFILL_RATE = 1 / 12;
    const key = `rate_limit:bucket:${ip}`;

    const now = Date.now();
    const data = await redisClient.hGetAll(key);

    let tokens = data.tokens ? parseFloat(data.tokens) : CAPACITY;
    let lastRefill = data.lastRefill ? parseInt(data.lastRefill) : now;

    const elapsed = (now - lastRefill) / 1000;
    const refill = elapsed * REFILL_RATE;

    tokens = Math.min(CAPACITY, tokens + refill);

    if (tokens < 1) {
      res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
      return;
    }

    tokens -= 1;

    await redisClient.hSet(key, {
      tokens: tokens.toString(),
      lastRefill: now.toString(),
    });

    await redisClient.expire(key, 60);

    next();
  } catch (err) {
    console.error("Token bucket rate limiter error:", err);
    next();
  }
};

/* ---------------- LUA TOKEN BUCKET ---------------- */
const luaScript = `
local key = KEYS[1]

local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local ttl = tonumber(ARGV[4])

local data = redis.call("HMGET", key, "tokens", "lastRefill")
local tokens = tonumber(data[1])
local lastRefill = tonumber(data[2])

if tokens == nil then
  tokens = capacity
end

if lastRefill == nil then
  lastRefill = now
end

local elapsed = (now - lastRefill) / 1000
local refill = elapsed * refill_rate
tokens = math.min(capacity, tokens + refill)

if tokens < 1 then
  redis.call("HSET", key, "tokens", tokens, "lastRefill", now)
  redis.call("EXPIRE", key, ttl)
  return 0
end

tokens = tokens - 1

redis.call("HSET", key, "tokens", tokens, "lastRefill", now)
redis.call("EXPIRE", key, ttl)

return 1
`;

export const tokenBucketLuaRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const redisClient = getRedisClient();
    const ip = req.ip;

    const CAPACITY = 5;
    const REFILL_RATE = 1 / 12;
    const TTL = 60;
    const key = `rate_limit:bucket:${ip}`;

    const now = Date.now();

    const allowed = (await redisClient.eval(luaScript, {
      keys: [key],
      arguments: [
        CAPACITY.toString(),
        REFILL_RATE.toString(),
        now.toString(),
        TTL.toString(),
      ],
    })) as number;

    if (allowed === 0) {
      res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
      return;
    }

    next();
  } catch (err) {
    console.error("Token bucket (Lua) error:", err);
    next();
  }
};
