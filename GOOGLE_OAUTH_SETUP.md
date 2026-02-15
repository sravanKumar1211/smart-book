# Fix: Error 400 redirect_uri_mismatch

Your app is sending this redirect URI (this is correct):
```
http://localhost:5000/api/auth/google/callback
```

**You must add this EXACT URL in Google Cloud Console.** The code is fine; this is a one-time setup step.

---

## Step-by-step

1. **Open Credentials**
   - Go to: https://console.cloud.google.com/apis/credentials
   - Or: [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**

2. **Edit your OAuth client**
   - Under "OAuth 2.0 Client IDs", click your **Web application** client (the one whose Client ID matches your `.env`)

3. **Add Authorized JavaScript origins**
   - In **Authorized JavaScript origins**, click **+ ADD URI**
   - Add these (one at a time, no trailing slash):
   ```
   http://localhost:3000
   http://localhost:3001
   http://localhost:5000
   ```

4. **Add Authorized redirect URI**
   - In **Authorized redirect URIs**, click **+ ADD URI**
   - Type or paste **exactly** (no spaces, no trailing slash):
   ```
   http://localhost:5000/api/auth/google/callback
   ```

5. **Save**
   - Click **SAVE** at the bottom
   - Wait 1–2 minutes for changes to apply

6. **Try again**
   - Sign in with Google again in your app

---

## Checklist

| ✓ | Requirement |
|---|-------------|
| | Starts with `http://` (not `https://`) for localhost |
| | `localhost` (not `127.0.0.1`) |
| | Port `5000` |
| | Path `/api/auth/google/callback` |
| | No trailing slash at the end |

---

## Authorized JavaScript origins (summary)

Add these for local development:

| Origin | Purpose |
|--------|---------|
| `http://localhost:3000` | Frontend (Vite default port) |
| `http://localhost:3001` | Frontend (when 3000 is in use) |
| `http://localhost:5000` | Backend (OAuth flow) |

No trailing slash. Use `http` for localhost.

---

## Production

When you deploy, add:

**Authorized JavaScript origins:**
```
https://your-app.vercel.app
```

**Authorized redirect URIs:**
```
https://your-app.vercel.app/api/auth/google/callback
```
