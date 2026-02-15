# Vercel Deployment Guide

## Prerequisites
- GitHub account with the repository: https://github.com/sravanKumar1211/smart-book.git
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas connection string
- Google OAuth credentials

## Deployment Steps

### 1. Import Project to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository: `sravanKumar1211/smart-book`
3. Vercel will auto-detect the configuration from `vercel.json`

### 2. Configure Environment Variables
In the Vercel project settings, add these environment variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-vercel-domain.vercel.app/api/auth/google/callback
FRONTEND_URL=https://your-vercel-domain.vercel.app
SESSION_SECRET=your_random_session_secret
```

**Important:** Replace `your-vercel-domain` with your actual Vercel domain after deployment.

### 3. Update Google OAuth Settings
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Navigate to APIs & Services > Credentials
3. Edit your OAuth 2.0 Client ID
4. Add your Vercel domain to:
   - Authorized JavaScript origins: `https://your-vercel-domain.vercel.app`
   - Authorized redirect URIs: `https://your-vercel-domain.vercel.app/api/auth/google/callback`

### 4. Deploy
1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be live at `https://your-vercel-domain.vercel.app`

## Project Structure
- Frontend is built and served as static files from `Backend/public/`
- Backend API runs as serverless functions via `api/index.js`
- All routes are handled by the backend, which serves the SPA for non-API routes

## Features Included
- Google OAuth authentication
- Create, read, update, and delete bookmarks
- Responsive UI with Tailwind CSS
- MongoDB data persistence
- Session management with MongoDB store

## Troubleshooting

### Build Fails
- Check that all environment variables are set correctly
- Verify MongoDB connection string is valid

### OAuth Not Working
- Ensure Google OAuth callback URL matches your Vercel domain
- Check that credentials are correctly set in environment variables

### Static Files Not Loading
- The frontend is pre-built and included in `Backend/public/`
- Vercel serves these files automatically via the backend

## Local Development
To run locally:
```bash
# Install dependencies
cd Frontend && npm install
cd ../Backend && npm install

# Build frontend
cd Frontend && npm run build

# Copy build to backend
Copy-Item -Recurse -Force Frontend\dist Backend\public

# Start backend (serves both API and frontend)
cd Backend && npm run dev
```

Visit http://localhost:5000
