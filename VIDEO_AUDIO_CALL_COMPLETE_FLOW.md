# 📞 Complete Video/Audio Call Flow (A to Z)

## 🎯 Real-Time Call Flow Between Roy and Joy

---

## Phase 1: INITIALIZATION (App Startup)

### Step 1: User Opens App
```
Roy opens app → http://localhost:3001/login
├── App loads
├── SocketProvider initializes
└── Socket connects to server (localhost:3000)
```

### Step 2: Socket Connection
```javascript
// SocketContext.tsx
const socketInstance = io('http://localhost:3000')

socketInstance.on('connect', () => {
  console.log('Socket connected')
  // Register user with socket
  const userData = JSON.parse(localStorage.getItem('user'))
  socketInstance.emit('register', userData.id)
})
```

### Step 3: Server Registers User
```javascript
// server.js
socket.on('register', (userId) => {
  users.set('roy_id', 'socket_abc123')
  console.log('User roy_id registered with socket socket_abc123')
})
```

**Same happens for Joy:**
```
Joy opens app → Socket connects → Registers as 'joy_id' with 'socket_xyz789'
```

---

## Phase 2: INITIATING CALL (Roy Calls Joy)

### Step 4: Roy Clicks Video Button
```
Roy on /users page
├── Sees Joy in user list
├── Clicks Video button (camera icon)
└── handleCallClick() triggered
```

```javascript
// UserListScreen.tsx
const handleCallClick = (user, type, rate, e) => {
  setSelectedCall({ user: Joy, type: 'video', rate: 10 })
  setShowCallModal(true) // Show confirmation modal
}
```

### Step 5: Confirmation Modal
```
Modal appears:
├── "Start video call with Joy?"
├── "Rate: ₹10/min"
├── [Cancel] [Start Call] buttons
└── Roy clicks "Start Call"
```

### Step 6: Roy Confirms Call
```javascript
const handleConfirmCall = () => {
  setShowCallModal(false)
  setIsRinging(true) // Show ringing screen
  
  const channelName = `call_${Date.now()}` // e.g., "call_1234567890"
  
  // Save call data
  sessionStorage.setItem('callData', JSON.stringify({
    userName: 'Joy',
    userAvatar: 'joy_pic.jpg',
    rate: 10,
    type: 'video',
    channelName: 'call_1234567890',
    otherUserId: 'joy_id'
  }))
  
  // Emit socket event to Joy
  socket.emit('call-user', {
    callerId: 'roy_id',
    callerName: 'Roy',
    receiverId: 'joy_id',
    callType: 'video',
    channelName: 'call_1234567890'
  })
}
```

### Step 7: Roy Sees Ringing Screen
```
Roy's screen:
├── Ringing animation (pulsing phone icon)
├── "Ringing..."
└── Waiting for Joy to accept
```

---

## Phase 3: RECEIVING CALL (Joy's Side)

### Step 8: Server Receives Call Request
```javascript
// server.js
socket.on('call-user', ({ callerId, callerName, receiverId, callType, channelName }) => {
  console.log('Call from roy_id to joy_id')
  
  // Find Joy's socket
  const joySocketId = users.get('joy_id') // 'socket_xyz789'
  
  // Send to Joy
  io.to('socket_xyz789').emit('incoming-call', {
    callerId: 'roy_id',
    callerName: 'Roy',
    callType: 'video',
    channelName: 'call_1234567890'
  })
})
```

### Step 9: Joy Receives Incoming Call
```javascript
// UserListScreen.tsx (Joy's browser)
socket.on('incoming-call', ({ callerId, callerName, callType, channelName }) => {
  console.log('Incoming call from Roy')
  setIncomingCall({
    callerId: 'roy_id',
    callerName: 'Roy',
    callType: 'video',
    channelName: 'call_1234567890'
  })
})
```

### Step 10: Joy Sees Incoming Call Modal
```
Joy's screen:
├── Modal appears
├── "Roy"
├── "Incoming video call..."
├── [Decline] [Accept] buttons
└── Joy clicks "Accept"
```

---

## Phase 4: ACCEPTING CALL (Joy Accepts)

### Step 11: Joy Accepts Call
```javascript
const handleAcceptCall = () => {
  // Save call data
  sessionStorage.setItem('channelName', 'call_1234567890')
  sessionStorage.setItem('callData', JSON.stringify({
    userName: 'Roy',
    type: 'video',
    channelName: 'call_1234567890',
    otherUserId: 'roy_id'
  }))
  
  // Notify Roy
  socket.emit('accept-call', {
    callerId: 'roy_id',
    channelName: 'call_1234567890'
  })
  
  // Navigate to video call screen
  router.push('/video-call')
}
```

### Step 12: Server Notifies Roy
```javascript
// server.js
socket.on('accept-call', ({ callerId, channelName }) => {
  console.log('Joy accepted, notifying Roy')
  
  const roySocketId = users.get('roy_id') // 'socket_abc123'
  
  io.to('socket_abc123').emit('call-accepted', {
    channelName: 'call_1234567890'
  })
})
```

### Step 13: Roy Receives Acceptance
```javascript
// UserListScreen.tsx (Roy's browser)
socket.on('call-accepted', ({ channelName }) => {
  console.log('Joy accepted!')
  setIsRinging(false) // Hide ringing screen
  
  sessionStorage.setItem('channelName', 'call_1234567890')
  
  // Navigate to video call screen
  router.push('/video-call')
})
```

---

## Phase 5: ESTABLISHING VIDEO CONNECTION (Agora)

### Step 14: Both Navigate to Video Call Screen
```
Roy: /video-call page loads
Joy: /video-call page loads
```

### Step 15: Initialize Agora Client
```javascript
// VideoCallScreen.tsx (Both users)
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

useEffect(() => {
  const init = async () => {
    const channelName = sessionStorage.getItem('channelName') // 'call_1234567890'
    
    // Join Agora channel
    await client.join(
      '5296c3e4d4b2432f8cf42a9f8e2041e5', // App ID
      'call_1234567890',                    // Channel name
      null,                                  // Token (null for testing)
      null                                   // UID (auto-generated)
    )
    
    console.log('Joined Agora channel')
  }
  
  init()
}, [])
```

### Step 16: Create Local Tracks
```javascript
// Create microphone audio track
const audioTrack = await AgoraRTC.createMicrophoneAudioTrack()
setLocalAudioTrack(audioTrack)

// Create camera video track
const videoTrack = await AgoraRTC.createCameraVideoTrack()
setLocalVideoTrack(videoTrack)

console.log('Local tracks created')
```

### Step 17: Publish Local Tracks
```javascript
// Publish to Agora channel
await client.publish([audioTrack, videoTrack])

console.log('Tracks published')

// Play local video
videoTrack.play('local-video') // Shows in small box
```

### Step 18: Subscribe to Remote User
```javascript
// Listen for remote user
client.on('user-published', async (user, mediaType) => {
  console.log('Remote user published:', mediaType)
  
  // Subscribe to remote user
  await client.subscribe(user, mediaType)
  
  if (mediaType === 'video') {
    // Play remote video
    user.videoTrack?.play('remote-video') // Shows in main screen
  }
  
  if (mediaType === 'audio') {
    // Play remote audio
    user.audioTrack?.play()
  }
})
```

---

## Phase 6: ACTIVE CALL (Both in Call)

### Step 19: Video/Audio Streaming
```
Roy's Screen:
├── Remote video (Joy's face) - Main screen
├── Local video (Roy's face) - Small box bottom-left
├── Timer: 00:00, 00:01, 00:02...
├── Cost: ₹0, ₹10, ₹10...
└── Controls: [Mic] [End Call] [Video]

Joy's Screen:
├── Remote video (Roy's face) - Main screen
├── Local video (Joy's face) - Small box bottom-left
├── Timer: 00:00, 00:01, 00:02...
├── Cost: ₹0, ₹10, ₹10...
└── Controls: [Mic] [End Call] [Video]
```

### Step 20: Real-Time Streaming
```
Agora Server:
├── Receives Roy's video/audio
├── Sends to Joy
├── Receives Joy's video/audio
├── Sends to Roy
└── Continuous real-time streaming
```

---

## Phase 7: ENDING CALL (Joy Ends Call)

### Step 21: Joy Clicks End Call
```javascript
const handleEndCall = () => {
  console.log('Joy clicked end call')
  
  const callData = sessionStorage.getItem('callData')
  const data = JSON.parse(callData)
  
  // Notify Roy via socket
  socket.emit('end-call', {
    userId: 'joy_id',
    otherUserId: 'roy_id' // Roy's ID
  })
  
  // Close local tracks
  localVideoTrack?.close()
  localAudioTrack?.close()
  
  // Leave Agora channel
  client.leave()
  
  // Clear data
  sessionStorage.removeItem('callData')
  sessionStorage.removeItem('channelName')
  
  // Navigate back
  router.push('/users')
}
```

### Step 22: Server Notifies Roy
```javascript
// server.js
socket.on('end-call', ({ userId, otherUserId }) => {
  console.log('Joy ended call, notifying Roy')
  
  const roySocketId = users.get('roy_id') // 'socket_abc123'
  
  io.to('socket_abc123').emit('call-ended')
})
```

### Step 23: Roy Receives Call-Ended Event
```javascript
// VideoCallScreen.tsx (Roy's browser)
socket.on('call-ended', () => {
  console.log('🔴 Joy ended the call')
  
  // Close local tracks
  localVideoTrack?.close()
  localAudioTrack?.close()
  
  // Leave Agora channel
  client.leave()
  
  // Clear data
  sessionStorage.removeItem('callData')
  sessionStorage.removeItem('channelName')
  
  // Navigate back
  router.push('/users')
})
```

### Step 24: Both Return to User List
```
Joy: Back on /users page
Roy: Automatically back on /users page
```

---

## 📊 Complete Timeline:

```
Time | Roy                          | Joy                          | Server
-----|------------------------------|------------------------------|--------
0s   | Opens app                    | Opens app                    | -
1s   | Socket connects              | Socket connects              | Registers both
2s   | Sees Joy in list             | Sees Roy in list             | -
3s   | Clicks video button          | -                            | -
4s   | Confirms call                | -                            | -
5s   | Ringing screen               | -                            | Receives call-user
6s   | -                            | Incoming call modal          | Sends to Joy
7s   | -                            | Clicks accept                | -
8s   | -                            | Navigates to /video-call     | Receives accept-call
9s   | Receives call-accepted       | -                            | Sends to Roy
10s  | Navigates to /video-call     | -                            | -
11s  | Joins Agora channel          | Joins Agora channel          | -
12s  | Creates local tracks         | Creates local tracks         | -
13s  | Publishes tracks             | Publishes tracks             | -
14s  | Subscribes to Joy            | Subscribes to Roy            | -
15s  | Video streaming starts       | Video streaming starts       | -
...  | Active call                  | Active call                  | -
5min | -                            | Clicks end call              | -
5min | -                            | Closes tracks                | Receives end-call
5min | Receives call-ended          | Navigates to /users          | Sends to Roy
5min | Closes tracks                | -                            | -
5min | Navigates to /users          | -                            | -
```

---

## 🔑 Key Technologies:

1. **Socket.IO** - Real-time signaling (call, accept, end)
2. **Agora RTC** - Video/audio streaming
3. **React** - UI components
4. **Next.js** - Routing and navigation
5. **MongoDB** - User data storage

---

## 📡 Data Flow:

```
User Action → Socket Event → Server → Socket Event → Other User
     ↓                                                      ↓
  UI Update                                            UI Update
     ↓                                                      ↓
Agora Join ←────────── Agora Server ──────────────→ Agora Join
     ↓                                                      ↓
Stream Video/Audio ←── Agora Cloud ──────────→ Stream Video/Audio
```

---

**This is the complete A to Z flow of video/audio calls in your app! 🎉**
