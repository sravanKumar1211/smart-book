# Deploy Smart Bookmark to Vercel

## 1. Push your code to GitHub

Make sure your project is in a Git repo and pushed to GitHub (or GitLab/Bitbucket).

## 2. Import project on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New** → **Project**.
3. Import your repository.
4. **Root Directory**: leave as `.` (project root).
5. **Framework Preset**: Other.
6. **Build Command**: `npm run build` (default from vercel.json).
7. **Install Command**: `npm install && cd Backend && npm install` (default from vercel.json).

## 3. Environment variables

In the Vercel project → **Settings** → **Environment Variables**, add:

| Name | Value | Notes |
|------|--------|------|
| `NODE_ENV` | `production` | Required |
| `MONGODB_URI` | Your MongoDB Atlas connection string | Same as local |
| `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID | Same as local |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth Client Secret | Same as local |
| `GOOGLE_CALLBACK_URL` | `https://YOUR_VERCEL_URL.vercel.app/api/auth/google/callback` | **Use your real Vercel URL** |
| `FRONTEND_URL` | `https://YOUR_VERCEL_URL.vercel.app` | **Use your real Vercel URL** |
| `SESSION_SECRET` | A long random string | e.g. `openssl rand -base64 32` |

Replace `YOUR_VERCEL_URL` with your actual Vercel deployment URL (e.g. `smart-bookmark-xyz123`).

## 4. Google Cloud Console (production OAuth)

1. Open [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
2. Edit your OAuth 2.0 Web client.
3. **Authorized JavaScript origins** – add:
   - `https://YOUR_VERCEL_URL.vercel.app`
4. **Authorized redirect URIs** – add:
   - `https://YOUR_VERCEL_URL.vercel.app/api/auth/google/callback`

Save and wait 1–2 minutes.

## 5. Deploy

Click **Deploy**. After the first deploy you’ll get a URL like `https://your-project.vercel.app`.

If you used a placeholder for `GOOGLE_CALLBACK_URL` or `FRONTEND_URL`, update them in Vercel Environment Variables to the real URL and redeploy.

## 6. Optional: custom domain

In Vercel: **Settings** → **Domains** to add a custom domain. Then update:

- `GOOGLE_CALLBACK_URL`
- `FRONTEND_URL`
- Google OAuth authorized origins and redirect URIs

to use that domain.
