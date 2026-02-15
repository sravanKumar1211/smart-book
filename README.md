# Smart Bookmark Manager

A modern bookmark manager built with MERN stack, featuring Google OAuth authentication and full CRUD operations.

## 🚀 Live Demo

**Deployed Application**: [https://smart-book-2-5hmsrf0kc-sravankumars-projects-790f1948.vercel.app/login](https://smart-book-2-5hmsrf0kc-sravankumars-projects-790f1948.vercel.app/login)

## 👨‍💻 Author

**Sravan Kumar**

## Features

- 🔐 **Google OAuth Authentication** - Secure login with Google
- 📑 **Full CRUD Operations** - Create, Read, Update, and Delete bookmarks
- ✏️ **Edit Bookmarks** - Update bookmark URL and title
- 🔒 **Private Bookmarks** - Each user can only see their own bookmarks
- 🔄 **RESTful APIs** - Clean REST API architecture
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, Passport.js
- **Authentication**: Google OAuth 2.0
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

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
│   ├── public/                  # Built frontend files
│   ├── app.js                   # Express app configuration
│   └── server.js                # Server entry point
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx        # Login component
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── AddBookmark.jsx  # Add bookmark form
│   │   │   └── BookmarkList.jsx # Bookmark list with edit
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   └── package.json
├── api/
│   └── index.js                 # Vercel serverless function
├── vercel.json                  # Vercel configuration
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Google Cloud Console account (for OAuth credentials)

### 1. Clone the Repository

```bash
git clone https://github.com/sravanKumar1211/smart-book.git
cd smart-book
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

### 4. Environment Variables

Create a `.env` file in the `Backend` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=your_random_session_secret
```

### 5. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:5000/api/auth/google/callback`
   - Production: `https://your-domain.vercel.app/api/auth/google/callback`

### 6. MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env` file

## Running Locally

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

Access the app at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - OAuth callback
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Bookmarks
- `GET /api/bookmarks` - Get all bookmarks (requires auth)
- `POST /api/bookmarks` - Create bookmark (requires auth)
- `PUT /api/bookmarks/:id` - Update bookmark (requires auth)
- `DELETE /api/bookmarks/:id` - Delete bookmark (requires auth)

## Deployment

The application is deployed on Vercel. See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

## License

ISC
