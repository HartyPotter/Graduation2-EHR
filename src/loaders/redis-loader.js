import { createClient } from 'redis';

const redisClient = createClient({
    password: 'JoeBeanz123',
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
        host: 'redis-11154.c100.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 11154
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
