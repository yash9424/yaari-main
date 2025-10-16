# Google Sign-In Testing Guide

## Quick Test Steps:

### Test 1: Web Browser (Full Google Sign-In)

1. Start both servers:
   ```bash
   # Terminal 1 - Admin Panel
   cd "yarri admin panel"
   npm run dev
   
   # Terminal 2 - Mobile App
   cd "yarri app"
   npm run dev
   ```

2. Open browser: http://localhost:3001/login

3. Click "Continue with Google" button

4. **Expected Result:**
   - Phone number field visible
   - "Get OTP" button visible
   - OR divider visible
   - "Continue with Google" button visible and ENABLED
   - Clicking opens Google popup
   - Select account → Auto login → Redirect to language/users page

---

### Test 2: Android App (Full Google Sign-In)

1. Build and sync:
   ```bash
   cd "yarri app"
   npm run build
   npx cap sync
   npx cap open android
   ```

2. In Android Studio:
   - Click "Run" (green play button)
   - Wait for app to install on device/emulator

3. On the app:
   - Click "Continue with Google" button
   - Select your Google account
   - Grant permissions

4. **Expected Result:**
   - Google account picker appears
   - After selection, app logs you in
   - New user → Redirects to language selection
   - Existing user → Redirects to users page
   - User data saved in MongoDB with email

---

### Test 3: Verify Database

1. Check MongoDB:
   ```bash
   # Connect to MongoDB
   mongosh mongodb://localhost:27017/yarri
   
   # View users
   db.users.find().pretty()
   ```

2. **Expected Fields for Google User:**
   ```javascript
   {
     _id: ObjectId("..."),
     email: "yourname@gmail.com",
     name: "Your Name",
     googleId: "1234567890",
     profilePic: "https://lh3.googleusercontent.com/...",
     loginMethod: "google",
     balance: 0,
     isActive: true,
     createdAt: ISODate("..."),
     // phone: null (optional)
     // gender: null (set later)
   }
   ```

---

### Test 4: Admin Panel

1. Open: http://localhost:3000/dashboard/users

2. **Expected Result:**
   - Users table shows Email column
   - Google users show email address
   - Phone users show "-" in email column
   - Click "View" (eye icon) on Google user
   - Modal shows email field

---

### Test 5: Edit Profile

1. Login via Google on mobile app
2. Complete language/gender selection
3. Go to Edit Profile

4. **Expected Result:**
   - Name field pre-filled from Google
   - Email field pre-filled from Google
   - Profile picture from Google
   - Can edit and save all fields

---

## Common Issues & Fixes:

### Issue 1: "Google Sign-In failed"
**Fix:**
- Check internet connection
- Verify SHA-1 fingerprint in Google Console matches your keystore
- Regenerate keystore if needed

### Issue 2: Button always disabled
**Fix:**
- Make sure you're running on actual device/emulator (not browser)
- Check `npx cap sync` was run after config changes
- Rebuild the app

### Issue 3: "Failed to login with Google" after selecting account
**Fix:**
- Check admin panel is running on port 3000
- Check MongoDB is running
- Check API endpoint: http://localhost:3000/api/auth/google-login
- Check browser console for errors

### Issue 4: Popup blocked
**Fix:**
- Allow popups for localhost:3001
- Check browser popup blocker settings
- Try clicking the button again

---

## Test Checklist:

- [ ] Phone login still works
- [ ] Google button visible on login page
- [ ] Google button disabled in browser
- [ ] Google button enabled in native app
- [ ] Google sign-in opens account picker
- [ ] New Google user creates account
- [ ] Existing Google user logs in
- [ ] Email saved to database
- [ ] Email shown in edit profile
- [ ] Email shown in admin panel
- [ ] User redirects correctly after login

---

## Debug Commands:

```bash
# Check if Google Auth plugin is installed
cd "yarri app"
npm list @codetrix-studio/capacitor-google-auth

# Check Capacitor plugins
npx cap ls

# View Android logs
npx cap run android -l

# Clear app data and reinstall
npx cap sync --force
```

---

## Success Indicators:

✅ Google button appears on login page  
✅ Button works on native app  
✅ User can select Google account  
✅ User data saved with email  
✅ No OTP required for Google users  
✅ Email visible in profile and admin panel  
✅ Both login methods work independently  

---

**Ready to test! 🚀**
