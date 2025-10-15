import { Phone, Mic, Video, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface VideoCallScreenProps {
  userName: string
  userAvatar: string
  rate: number
  onEndCall: () => void
}

export default function VideoCallScreen({ userName, userAvatar, rate, onEndCall }: VideoCallScreenProps) {
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const cost = Math.ceil(duration / 60) * rate

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800">
            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="absolute top-8 left-0 right-0 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">{userName}</h2>
          <p className="text-lg">{formatTime(duration)}</p>
          <p className="text-sm text-gray-400 mt-1">₹{cost}</p>
        </div>

        <div className="absolute bottom-32 left-4 w-24 h-32 bg-gray-800 rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white text-xs">
            You
          </div>
        </div>
      </div>

      <div className="p-8 flex justify-center items-center space-x-6">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isMuted ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          <Mic className="text-white" size={24} />
        </button>
        
        <button
          onClick={onEndCall}
          className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
        >
          <Phone className="text-white rotate-[135deg]" size={28} />
        </button>
        
        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          <Video className="text-white" size={24} />
        </button>
      </div>
    </div>
  )
}
