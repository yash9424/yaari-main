const { createServer } = require('http')
const { Server } = require('socket.io')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)
  
  const io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:3001', 'http://localhost:3000'],
      methods: ['GET', 'POST']
    }
  })

  const users = new Map()

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on('register', (userId) => {
      users.set(userId, socket.id)
      console.log(`User ${userId} registered with socket ${socket.id}`)
    })

    socket.on('call-user', ({ callerId, callerName, receiverId, callType, channelName }) => {
      console.log('Call request received:', { callerId, callerName, receiverId, callType })
      console.log('Registered users:', Array.from(users.keys()))
      const receiverSocketId = users.get(receiverId)
      console.log('Receiver socket ID:', receiverSocketId)
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('incoming-call', {
          callerId,
          callerName,
          callType,
          channelName
        })
        console.log(`Call sent from ${callerName} to ${receiverId}`)
      } else {
        console.log(`Receiver ${receiverId} not found in registered users`)
      }
    })

    socket.on('accept-call', ({ callerId, channelName }) => {
      const callerSocketId = users.get(callerId)
      if (callerSocketId) {
        io.to(callerSocketId).emit('call-accepted', { channelName })
      }
    })

    socket.on('decline-call', ({ callerId }) => {
      const callerSocketId = users.get(callerId)
      if (callerSocketId) {
        io.to(callerSocketId).emit('call-declined')
      }
    })

    socket.on('end-call', ({ userId }) => {
      const userSocketId = users.get(userId)
      if (userSocketId) {
        io.to(userSocketId).emit('call-ended')
      }
    })

    socket.on('disconnect', () => {
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId)
          console.log(`User ${userId} disconnected`)
          break
        }
      }
    })
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
      console.log(`> Socket.io server running`)
    })
})
