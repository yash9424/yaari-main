# Google Sign-In Setup Guide

## What You Asked For:
- Google auto sign-up
- Skip OTP for Google users
- Auto-create user account with Google profile

## Steps to Implement (When Ready):

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API** or **Google Identity Services**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen
6. Create two Client IDs:
   - **Web Application** (for testing in browser)
   - **Android** (for Capacitor app - need SHA-1 fingerprint)

### 2. What to Provide:

```
Web Client ID: xxxxx-xxxxx.apps.googleusercontent.com
Android Client ID: xxxxx-xxxxx.apps.googleusercontent.com
```

### 3. Implementation Needed:

**Mobile App (`yarri app`):**
- Install package: `npm install @react-oauth/google`
- Add Google Sign-In button on login page
- Hardcode Client ID in code (no env file)
- Call admin panel API: `/api/auth/google-login`

**Admin Panel (`yarri admin panel`):**
- Create API route: `/api/auth/google-login`
- Verify Google token
- Create/login user in MongoDB
- Return user data (skip OTP)

### 4. User Flow:

```
User clicks "Sign in with Google"
↓
Google popup/redirect
↓
User selects Google account
↓
Get user info (name, email, photo)
↓
Create/login user in MongoDB (skip OTP)
↓
New user → Language selection
Existing user → Users page
```

### 5. Data Stored in MongoDB:

```javascript
{
  googleId: "google-user-id",
  email: "user@gmail.com",
  name: "User Name",
  profilePic: "google-photo-url",
  phone: null, // optional - can add later
  gender: null, // set in language/gender flow
  createdAt: Date,
  loginMethod: "google"
}
```

## When You're Ready:

Just say: **"Setup Google Sign-In"** and provide the Client IDs.

I'll implement everything with hardcoded values (no env files).
