import express from 'express';
import { port } from './config/config.js';
import loader from './loaders/loaders-index.js';

const app = express();

loader(app);

app.listen(port, err => {
  if (err) {
    console.error('Failed to start the server: ', err);
    process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

export default app