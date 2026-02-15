import { asyncHandler } from './asyncHandler.js';

// Middleware to check if user is authenticated
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    success: false, 
    message: 'Please log in to access this resource' 
  });
});
