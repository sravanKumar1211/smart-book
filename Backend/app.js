/**
 * Express app factory. Used by server.js (local) and Vercel serverless.
 * For production/Vercel, uses MongoDB session store; for dev uses memory store.
 */
import './loadEnv.js';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import authRoutes from './routes/authRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';
import './config/passport.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

function createSessionStore() {
  if (isProduction && mongoose.connection.readyState === 1) {
    return MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: mongoose.connection.db?.databaseName,
      ttl: 24 * 60 * 60, // 24 hours
    });
  }
  return undefined; // use default MemoryStore in dev
}

export async function createApp() {
  if (isProduction && mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI);
  }

  const app = express();

  app.use(cors({
    origin: isProduction ? true : [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  };
  const store = createSessionStore();
  if (store) sessionConfig.store = store;

  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api/auth', authRoutes);
  app.use('/api/bookmarks', bookmarkRoutes);

  // Serve static files from public folder
  const publicPath = path.join(__dirname, 'public');
  app.use(express.static(publicPath));
  
  // Serve index.html for all non-API routes (SPA support)
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

  app.use(errorHandler);
  return app;
}
