# 🔧 Fix Agora Error - CAN_NOT_GET_GATEWAY_SERVER

## Error:
```
AgoraRTCError CAN_NOT_GET_GATEWAY_SERVER: dynamic use static key
```

## Cause:
You have an App Certificate enabled in Agora Console, but you're not generating tokens in your code.

---

## Solution 1: Disable App Certificate (Quick Fix)

### Step 1: Go to Agora Console
URL: https://console.agora.io/

### Step 2: Select Your Project
- Click on your project name
- Or create new project if needed

### Step 3: Disable App Certificate
1. Click on "Config" or "Edit"
2. Find "App Certificate" section
3. Click "Disable" or toggle it OFF
4. Save changes

### Step 4: Test Again
- Refresh your app
- Make a call
- Should work now!

---

## Solution 2: Generate Tokens (Production Ready)

If you want to keep App Certificate enabled (recommended for production), you need to generate tokens.

### Backend API to Generate Token:

Create: `yarri admin panel/app/api/agora/token/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { RtcTokenBuilder, RtcRole } from 'agora-access-token'

export async function POST(request: Request) {
  try {
    const { channelName, uid } = await request.json()
    
    const appId = '5296c3e4d4b2432f8cf42a9f8e2041e5'
    const appCertificate = 'b1e7ac4a7273473998567faebb1630fa'
    const role = RtcRole.PUBLISHER
    const expirationTimeInSeconds = 3600 // 1 hour
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    )
    
    return NextResponse.json({ token })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 })
  }
}
```

### Install Package:
```bash
cd "yarri admin panel"
npm install agora-access-token
```

### Update Video/Audio Call Screens:
```typescript
// Before joining channel
const response = await fetch('/api/agora/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ channelName, uid: 0 })
})
const { token } = await response.json()

// Use token when joining
await client.join(agoraConfig.appId, channelName, token, null)
```

---

## Recommended Approach:

### For Testing (Now):
✅ **Disable App Certificate** in Agora Console

### For Production (Later):
✅ **Enable App Certificate** and generate tokens

---

## Quick Steps to Fix Now:

1. **Go to:** https://console.agora.io/
2. **Select your project**
3. **Disable App Certificate**
4. **Refresh your app**
5. **Make a call** - Should work!

---

## Verify It's Fixed:

**Browser Console Should Show:**
```
✅ Agora client joined successfully
✅ Local tracks created
✅ Tracks published
```

**NOT:**
```
❌ AgoraRTCError CAN_NOT_GET_GATEWAY_SERVER
```

---

## Alternative: Use Different App ID

If you can't access Agora Console, create a new project:

1. Go to: https://console.agora.io/
2. Create new project
3. **Don't enable App Certificate**
4. Copy new App ID
5. Update `config/agora.ts`:
   ```typescript
   export const agoraConfig = {
     appId: 'YOUR_NEW_APP_ID',
   }
   ```

---

**Fix this first, then test the call end feature! 🚀**
