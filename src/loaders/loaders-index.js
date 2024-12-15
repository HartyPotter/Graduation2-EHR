import sequelize from './postgres-loader.js';
import expressLoader from './express-loader.js';
import { redisClient } from './redis-loader.js';

export default async (app) => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    // await sequelize.sync({ alter: true }); // Use alter: true to modify existing tables
    // console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  await redisClient.connect();

  expressLoader(app);
};