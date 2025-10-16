# 🚀 Test Call End NOW - With Debugging

## Quick Test (5 Minutes):

### 1. Start Servers

**Terminal 1:**
```bash
cd "d:\dating-app-Yaari\yarri admin panel"
node server.js
```
✅ Keep this visible to see logs!

**Terminal 2:**
```bash
cd "d:\dating-app-Yaari\yarri app"
npm run dev
```

---

### 2. Open 2 Browsers with Console

**Browser 1 (Roy):**
- URL: http://localhost:3001/login
- Press **F12** → Console tab
- Login as Roy

**Browser 2 (Joy - Incognito):**
- URL: http://localhost:3001/login
- Press **F12** → Console tab
- Login as Joy

---

### 3. Make a Call

**Roy:** Click Video button on Joy → Confirm  
**Joy:** Accept call  
**Both:** Now in video call

---

### 4. End Call and Watch

**Joy:** Click "End Call" button

**Watch Joy's Console:**
```
🔴 USER CLICKED END CALL BUTTON
📤 EMITTING end-call TO: roy_id
end-call event emitted successfully
```

**Watch Server Terminal:**
```
Call ended, notifying other user: roy_id
Call ended notification sent
```

**Watch Roy's Console:**
```
🔴 CALL ENDED BY OTHER USER - CLOSING VIDEO CALL
Navigating to /users
```

**Watch Roy's Screen:**
- Should automatically close call
- Should return to user list

---

## ✅ Success = Roy's call closes automatically

## ❌ If Not Working:

### Check Roy's Console:

**If you see:**
```
Setting up call-ended listener in video call
call-ended listener registered
```
✅ Listener is set up

**If you DON'T see that:**
❌ Socket not connected or listener not registered

### Check Server Terminal:

**If you see:**
```
Call ended, notifying other user: roy_id
Call ended notification sent
```
✅ Server is sending the event

**If you DON'T see that:**
❌ Server didn't receive end-call event

### Check Roy's Console After Joy Ends:

**If you see:**
```
🔴 CALL ENDED BY OTHER USER
```
✅ Event received, should navigate

**If you DON'T see that:**
❌ Event not received by Roy

---

## 🔧 Quick Fixes:

### Fix 1: Restart Server
```bash
# In Terminal 1 (Ctrl+C to stop)
node server.js
```

### Fix 2: Refresh Browsers
- Close both browsers
- Open fresh
- Login again
- Try call again

### Fix 3: Check Socket Connection
**In Roy's Console:**
```javascript
// Should show user data
localStorage.getItem('user')

// Should show call data
sessionStorage.getItem('callData')
```

---

## 📊 What Should Happen:

| Step | Joy (Ending) | Roy (Auto-End) | Server |
|------|-------------|----------------|--------|
| 1. Click End | ✅ Clicks button | - | - |
| 2. Emit Event | ✅ Emits end-call | - | ✅ Receives |
| 3. Server Notify | - | - | ✅ Sends to Roy |
| 4. Receive Event | - | ✅ Receives call-ended | - |
| 5. Close Call | ✅ Closes | ✅ Auto closes | - |
| 6. Navigate | ✅ To /users | ✅ To /users | - |

---

## 🎯 Expected Console Logs:

### Joy's Console:
```
🔴 USER CLICKED END CALL BUTTON
Call data: {"userName":"Roy","otherUserId":"roy_id",...}
Current user: joy_id
Other user: roy_id
📤 EMITTING end-call TO: roy_id
end-call event emitted successfully
Cleaning up local resources
Navigating back to users page
```

### Server Terminal:
```
Call ended, notifying other user: roy_id
Call ended notification sent
```

### Roy's Console:
```
🔴 CALL ENDED BY OTHER USER - CLOSING VIDEO CALL
Closing local video track
Closing local audio track
Leaving Agora channel
Clearing session data
Navigating to /users
```

---

## 🚨 If Still Not Working:

**Share these logs:**
1. Joy's console output (when clicking end call)
2. Server terminal output
3. Roy's console output (should show call-ended)

**Then we can debug further!**

---

**Test it now and check the console logs! 🎉**
