/* eslint-disable no-console */
import mongoose from 'mongoose';
import { dbUri } from '../config/config.js';

export default async () => {
  mongoose.connect(dbUri, {})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
};
