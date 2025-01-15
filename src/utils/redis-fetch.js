import { redisClient } from '../loaders/redis-loader.js';

export const getUserFromRedis = async userId => {
  const user = await redisClient.hGet(`user:${userId}`, 'user');
  return JSON.parse(user);
};
