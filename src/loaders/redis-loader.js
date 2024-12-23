import { createClient } from 'redis';
import { redisHost, redisPort, redisPass } from '../config/config.js';

const redisClient = createClient({
    socket: {
        reconnectStrategy: function(retries) {
            if (retries > 20) {
                console.log("Too many attempts to reconnect. Redis connection was terminated");
                return new Error("Too many retries.");
            } else {
                return retries * 500;
            }
        },
        connectTimeout: 10000,
        host: redisHost,
        port: redisPort,
        password: redisPass
    }
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (error) => {
    console.error('Failed to connect to Redis', error);
    process.exit(1);
});

export { redisClient };
