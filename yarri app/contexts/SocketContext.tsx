'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({ socket: null, isConnected: false })

export const useSocket = () => useContext(SocketContext)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = io('http://localhost:3000', {
      transports: ['websocket', 'polling']
    })

    socketInstance.on('connect', () => {
      console.log('Socket connected')
      setIsConnected(true)
      
      const user = localStorage.getItem('user')
      if (user) {
        const userData = JSON.parse(user)
        console.log('Registering user:', userData.id)
        socketInstance.emit('register', userData.id)
      }
    })

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected')
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
