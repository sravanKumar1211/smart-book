<<<<<<< HEAD
# Smart Bookmark App

A modern bookmark manager built with pure MERN stack, featuring Google OAuth authentication and RESTful APIs.

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google only (no email/password)
- 📑 **Bookmark Management** - Add and delete bookmarks with URL and title
- 🔒 **Private Bookmarks** - Each user can only see their own bookmarks
- 🔄 **RESTful APIs** - Clean REST API architecture for all operations
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Beautiful blue, white, and black color theme with Tailwind CSS

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, Passport.js
- **Authentication**: Google OAuth 2.0
- **Database**: MongoDB Atlas
- **API**: RESTful APIs

## Project Structure

```
Smart-Book/
├── Backend/
│   ├── config/
│   │   └── passport.js          # Google OAuth configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── bookmarkController.js # Bookmark CRUD operations
│   ├── middleware/
│   │   ├── asyncHandler.js      # Async wrapper for error handling
│   │   ├── auth.js              # Authentication middleware
│   │   └── errorHandler.js      # Global error handler
│   ├── models/
│   │   ├── User.js              # User model
│   │   └── Bookmark.js          # Bookmark model
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── bookmarkRoutes.js    # Bookmark routes
│   ├── server.js                # Express server setup
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx        # Login component
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── AddBookmark.jsx  # Add bookmark form
│   │   │   └── BookmarkList.jsx # Bookmark list display
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── .env.example                 # Environment variables template
└── README.md

```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Google Cloud Console account (for OAuth credentials)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Smart-Book
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

### 4. Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Atlas Connection
MONGODB_URI=your_mongodb_atlas_connection_string_here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL (for production, use your Vercel URL)
FRONTEND_URL=http://localhost:3000

# Session Secret (change this to a random string in production)
SESSION_SECRET=your_random_session_secret_here
```

### 5. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure consent screen
6. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (for development)
   - `https://your-domain.com/api/auth/google/callback` (for production)
7. Copy the Client ID and Client Secret to your `.env` file

### 6. MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `<password>` and `<dbname>` in the connection string
5. Add your connection string to `.env` as `MONGODB_URI`

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Production Mode

1. Build the frontend:
```bash
cd Frontend
npm run build
```

2. Set `NODE_ENV=production` in your `.env` file

3. Start the backend server:
```bash
cd Backend
npm start
```

The backend will serve the frontend as static files.

## Deployment

### Backend (Vercel or similar)

1. Set environment variables in your hosting platform
2. Update `GOOGLE_CALLBACK_URL` to your production URL
3. Update `FRONTEND_URL` to your production URL
4. Deploy the backend

### Frontend

The frontend is served as static files from the backend in production mode, so no separate deployment is needed.

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Bookmarks
- `GET /api/bookmarks` - Get all bookmarks (requires auth)
- `POST /api/bookmarks` - Create bookmark (requires auth)
- `DELETE /api/bookmarks/:id` - Delete bookmark (requires auth)

## Architecture

- **MVC Pattern**: Clear separation of concerns
- **RESTful APIs**: Clean REST API endpoints for all operations
- **Middleware**: Error handling, authentication, async wrapper
- **Security**: Session-based authentication, CORS protection

## License

ISC
=======
# smart-book
>>>>>>> 710c0bbf9db0183448fb5c1668a9aa900c62873f
