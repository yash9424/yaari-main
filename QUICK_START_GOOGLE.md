# 🚀 Quick Start - Test Google Sign-In NOW

## Step 1: Start Servers (2 terminals)

**Terminal 1 - Admin Panel:**
```bash
cd "d:\dating-app-Yaari\yarri admin panel"
npm run dev
```
Wait for: `✓ Ready on http://localhost:3000`

**Terminal 2 - Mobile App:**
```bash
cd "d:\dating-app-Yaari\yarri app"
npm run dev
```
Wait for: `✓ Ready on http://localhost:3001`

---

## Step 2: Test in Browser

1. Open: **http://localhost:3001/login**

2. You should see:
   - Phone number input field
   - "Get OTP" button
   - **OR** divider
   - **"Continue with Google"** button with Google logo

3. Click **"Continue with Google"**

4. Google popup opens → Select your account

5. After selecting account:
   - ✅ Auto-login (no OTP needed)
   - ✅ Redirects to language selection (new user) or users page (existing user)

---

## Step 3: Verify It Worked

### Check Browser:
- Should redirect to `/language` or `/users`
- Check localStorage: `user` object should have `email` field

### Check Database:
```bash
mongosh mongodb://localhost:27017/yarri
db.users.find().pretty()
```

Look for:
```javascript
{
  email: "your@gmail.com",
  name: "Your Name",
  googleId: "123456789",
  profilePic: "https://lh3.googleusercontent.com/...",
  loginMethod: "google",
  balance: 0,
  isActive: true
}
```

### Check Admin Panel:
1. Open: **http://localhost:3000/dashboard/users**
2. Login with admin credentials
3. See users table with Email column
4. Your Google account should be listed

---

## 🎯 What to Expect:

### ✅ Working:
- Google button visible and enabled
- Clicking opens Google popup
- Can select Google account
- Auto-login without OTP
- User created in database
- Email shown in profile
- Email shown in admin panel

### ❌ If Not Working:

**Popup blocked?**
- Allow popups for localhost:3001

**"Failed to login with Google"?**
- Check admin panel is running (port 3000)
- Check MongoDB is running
- Check browser console for errors

**Nothing happens?**
- Open browser console (F12)
- Look for error messages
- Check network tab for failed requests

---

## 📱 Test on Android (Optional):

```bash
cd "d:\dating-app-Yaari\yarri app"
npm run build
npx cap sync
npx cap open android
```

Then run in Android Studio → Same flow, but uses native Google Sign-In

---

## ✨ Features You Can Test:

1. **Google Login:**
   - Click "Continue with Google"
   - Select account
   - Auto-login

2. **Phone Login (still works):**
   - Enter phone number
   - Get OTP
   - Verify OTP
   - Login

3. **Profile Edit:**
   - After login, go to profile
   - See email field pre-filled
   - Can edit and save

4. **Admin Panel:**
   - View all users
   - See email column
   - Click view to see details

---

## 🎊 That's It!

**Your Google Sign-In is ready to use!**

Test it now at: **http://localhost:3001/login**
