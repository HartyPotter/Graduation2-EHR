import mongoose from 'mongoose';
import { dbUri } from '../config/config.js';

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB');

    // Get all collections
    const collections = await mongoose.connection.db.collections();

    // Drop each collection
    for (let collection of collections) {
      await collection.drop();
      console.log(`Dropped collection: ${collection.collectionName}`);
    }

    console.log('Database reset complete');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
};

setupDatabase();
