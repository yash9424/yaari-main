# 🚀 Test Video/Audio Calls NOW

## Quick Start (5 Minutes):

### Step 1: Start Servers

**Terminal 1:**
```bash
cd "d:\dating-app-Yaari\yarri admin panel"
node server.js
```
Wait for: `✓ Socket.io server running`

**Terminal 2:**
```bash
cd "d:\dating-app-Yaari\yarri app"
npm run dev
```
Wait for: `✓ Ready on http://localhost:3001`

---

### Step 2: Open 2 Browsers

**Browser 1 (Chrome):**
- Go to: http://localhost:3001/login
- Login as User A
- Go to Users page

**Browser 2 (Chrome Incognito or Firefox):**
- Go to: http://localhost:3001/login
- Login as User B
- Go to Users page

---

### Step 3: Make a Video Call

**In Browser 1 (User A):**
1. Find User B in the list
2. Click the **Video button** (camera icon)
3. Modal appears → Click "Start Call"
4. **You should see: Ringing screen with pulsing phone icon**

**In Browser 2 (User B):**
5. **You should see: Incoming call modal immediately**
6. Shows "Incoming video call from User A"
7. Click **"Accept"** button

**Both Browsers:**
8. **Ringing screen disappears** (User A)
9. **Both navigate to video call screen**
10. **Video streams should connect**
11. You can see yourself in small box (bottom left)
12. You can see other user in main screen
13. Timer starts: 00:00, 00:01, 00:02...

**Test Controls:**
- Click Mic button → Mutes/unmutes
- Click Video button → Turns video on/off
- Click Red Phone button → Ends call

**When you end call:**
- Other user's call ends automatically
- Both return to Users page

---

### Step 4: Test Audio Call

Same as above, but click **Phone button** instead of Video button.

---

### Step 5: Test Decline

**User A:** Start a call  
**User B:** Click "Decline"  
**Result:** Ringing stops immediately on User A, alert shows "Call declined"

---

## ✅ What Should Happen:

### ✅ When Calling:
- Confirmation modal appears
- After confirm, ringing screen shows
- Pulsing phone icon animation
- "Ringing..." text

### ✅ When Receiving:
- Incoming call modal appears immediately
- Shows caller name
- Shows call type (video/audio)
- Accept and Decline buttons

### ✅ When Accepted:
- Ringing screen disappears (caller)
- Both navigate to call screen
- Video/audio streams connect
- Timer starts
- Controls work

### ✅ When Declined:
- Ringing screen disappears (caller)
- Alert shows "Call declined by user"
- Stays on Users page

### ✅ When Call Ends:
- Other user's call ends automatically
- Both return to Users page
- Call data cleaned up

---

## ❌ If Something Doesn't Work:

### Ringing screen stuck:
1. Open browser console (F12)
2. Check for socket connection errors
3. Restart server.js
4. Refresh both browsers

### No incoming call:
1. Check server.js terminal for logs
2. Should see: "User registered with socket"
3. Should see: "Call sent from User A to User B"
4. Refresh receiver's browser

### Video not showing:
1. Allow camera/microphone permissions
2. Check Agora App ID in config/agora.ts
3. Check browser console for Agora errors

### Call connects but no video/audio:
1. Check browser permissions
2. Try different browser
3. Check network connection

---

## 🔍 Debug Logs:

### Server Terminal Should Show:
```
User connected: abc123
User xyz789 registered with socket def456
Call request received: { callerId: 'xyz789', receiverId: 'abc123' }
Call sent from User A to abc123
Call accepted by receiver, notifying caller: xyz789
```

### Browser Console Should Show:
```
Socket connected
Registering user: xyz789
Incoming call received: { callerName: 'User A', callType: 'video' }
Call accepted, navigating to call screen
```

---

## 🎯 Success Criteria:

- [ ] Ringing screen appears and disappears correctly
- [ ] Incoming call modal appears immediately
- [ ] Accept button works
- [ ] Decline button works
- [ ] Video streams connect
- [ ] Audio works
- [ ] Timer counts
- [ ] End call works for both users
- [ ] No stuck screens
- [ ] Proper navigation

---

**Test it now! Should work perfectly! 🎉**
