import express from 'express';
import passport from 'passport';
import { googleAuth, googleCallback, getMe, logout } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Must match exactly what's in Google Cloud Console → Credentials → Authorized redirect URIs
const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    callbackURL 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: (process.env.FRONTEND_URL || 'http://localhost:3000') + '/login',
    callbackURL 
  }),
  googleCallback
);

// Get current user
router.get('/me', getMe);

// Logout
router.post('/logout', isAuthenticated, logout);

export default router;
