# 🔍 Debug Call End Issue

## How to Test and Debug:

### Step 1: Start Servers with Logging

**Terminal 1 - Server:**
```bash
cd "d:\dating-app-Yaari\yarri admin panel"
node server.js
```
Keep this terminal visible to see logs!

**Terminal 2 - App:**
```bash
cd "d:\dating-app-Yaari\yarri app"
npm run dev
```

---

### Step 2: Open 2 Browsers with Console

**Browser 1 (Roy):**
1. Open: http://localhost:3001/login
2. Press F12 to open Developer Console
3. Go to Console tab
4. Login as Roy

**Browser 2 (Joy - Incognito):**
1. Open: http://localhost:3001/login
2. Press F12 to open Developer Console
3. Go to Console tab
4. Login as Joy

---

### Step 3: Make a Call and Watch Logs

**Roy's Browser:**
1. Click Video button on Joy
2. Confirm call
3. **Watch Console - Should see:**
   ```
   Calling user: { callerId: 'roy_id', receiverId: 'joy_id' }
   Socket: call-user emitted
   ```

**Joy's Browser:**
4. Accept call
5. **Watch Console - Should see:**
   ```
   Incoming call received
   Accepting call from: roy_id
   Socket: accept-call emitted
   ```

**Both Browsers:**
6. Call screen opens
7. **Watch Console - Should see:**
   ```
   Setting up call-ended listener in video call
   call-ended listener registered
   ```

---

### Step 4: End Call and Watch What Happens

**Joy's Browser (Ending Call):**
1. Click "End Call" button
2. **Watch Console - Should see:**
   ```
   🔴 USER CLICKED END CALL BUTTON
   Call data: {...}
   Current user: joy_id
   Other user: roy_id
   📤 EMITTING end-call TO: roy_id
   end-call event emitted successfully
   Cleaning up local resources
   Navigating back to users page
   ```

**Server Terminal - Should see:**
```
Call ended, notifying other user: roy_id
Call ended notification sent
```

**Roy's Browser (Should Auto-End):**
3. **Watch Console - Should see:**
   ```
   🔴 CALL ENDED BY OTHER USER - CLOSING VIDEO CALL
   Closing local video track
   Closing local audio track
   Leaving Agora channel
   Clearing session data
   Navigating to /users
   ```

---

## 🐛 If It's NOT Working:

### Check 1: Socket Connection

**In Both Browsers Console, type:**
```javascript
localStorage.getItem('user')
```

Should show user data with `id` field.

### Check 2: Call Data

**In Call Screen Console, type:**
```javascript
sessionStorage.getItem('callData')
```

Should show:
```json
{
  "userName": "Joy",
  "otherUserId": "joy_id",
  "type": "video",
  "channelName": "call_123456"
}
```

### Check 3: Socket Event Listener

**In Roy's Browser Console (while in call), type:**
```javascript
console.log('Testing call-ended event')
```

Then in Joy's browser, end the call. Roy's console should show the red message.

---

## 🔧 Common Issues:

### Issue 1: "Socket not available"
**Solution:**
- Check if SocketProvider is wrapping the app
- Verify socket connection in Network tab
- Restart server.js

### Issue 2: "Missing otherUserId"
**Solution:**
- Check sessionStorage.getItem('callData')
- Verify otherUserId is set when call starts
- Check UserListScreen.tsx handleConfirmCall function

### Issue 3: "call-ended event not received"
**Solution:**
- Check server.js logs
- Verify user IDs are correct
- Check if users are registered with socket
- Restart both browsers

### Issue 4: "Event received but doesn't navigate"
**Solution:**
- Check router.push('/users') is called
- Verify /users route exists
- Check for JavaScript errors in console

---

## 📊 Expected Flow:

```
Joy Ends Call:
1. Joy clicks button
2. Joy's console: "🔴 USER CLICKED END CALL BUTTON"
3. Joy's console: "📤 EMITTING end-call TO: roy_id"
4. Server logs: "Call ended, notifying other user: roy_id"
5. Roy's console: "🔴 CALL ENDED BY OTHER USER"
6. Roy's screen: Navigates to /users
7. Joy's screen: Already on /users
```

---

## 🧪 Manual Test:

**In Roy's Browser Console (while in call):**
```javascript
// Manually trigger call-ended event
window.dispatchEvent(new CustomEvent('call-ended'))
```

If this doesn't work, the event listener isn't set up properly.

---

## 📝 What to Check:

- [ ] Server.js is running
- [ ] Both users logged in
- [ ] Both users on call screen
- [ ] F12 console open on both browsers
- [ ] Socket connected (check Network tab)
- [ ] User IDs are correct
- [ ] otherUserId in callData
- [ ] call-ended listener registered
- [ ] No JavaScript errors

---

## 🚨 If Still Not Working:

1. **Restart Everything:**
   ```bash
   # Stop server (Ctrl+C)
   # Stop app (Ctrl+C)
   # Start server again
   node server.js
   # Start app again
   npm run dev
   ```

2. **Clear Everything:**
   - Clear browser cache
   - Clear localStorage
   - Clear sessionStorage
   - Close all browser tabs
   - Open fresh browsers

3. **Check Code:**
   - Verify VideoCallScreen.tsx has call-ended listener
   - Verify AudioCallScreen.tsx has call-ended listener
   - Verify server.js has end-call handler
   - Verify socket is passed to components

---

**Follow these steps and share the console logs if it's still not working!**
