import { asyncHandler } from '../middleware/asyncHandler.js';

// @desc    Initiate Google OAuth
// @route   GET /api/auth/google
export const googleAuth = asyncHandler(async (req, res, next) => {
  // This will be handled by passport middleware
});

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
export const googleCallback = asyncHandler(async (req, res, next) => {
  // This will be handled by passport middleware
  // After successful authentication, redirect to frontend
  res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
});

// @desc    Get current user
// @route   GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out'
      });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error destroying session'
        });
      }
      res.clearCookie('connect.sid');
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    });
  });
});
