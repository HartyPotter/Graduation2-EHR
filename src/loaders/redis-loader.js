import { createClient } from 'redis';
import { redisHost, redisPort, redisPass } from '../config/config.js';

const redisClient = createClient({
  username: 'default',
  password: redisPass,
  socket: {
    reconnectStrategy(retries) {
      if (retries > 20) {
        return new Error('Too many retries.');
      }
      return retries * 500;
    },
    connectTimeout: 10000,
    host: redisHost,
    port: redisPort,
  },
});

redisClient.on('connect', () => {
});

redisClient.on('error', error => {
  process.exit(1);
});

export { redisClient };
