import './loadEnv.js';
import mongoose from 'mongoose';
import { createApp } from './app.js';

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-bookmark')
  .then(async () => {
    console.log('Connected to MongoDB');
    const app = await createApp();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
