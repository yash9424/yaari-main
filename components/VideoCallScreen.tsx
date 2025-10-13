import { Phone, Mic, MicOff, Video, VideoOff, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface VideoCallScreenProps {
  onEnd: () => void
  userName: string
  userAvatar: string
  rate: number
}

export default function VideoCallScreen({ onEnd, userName, userAvatar, rate }: VideoCallScreenProps) {
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

  const calculateCost = () => {
    const minutes = Math.ceil(duration / 60)
    return minutes * rate
  }

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gray-700 rounded-full overflow-hidden">
            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="absolute top-8 left-0 right-0 flex flex-col items-center">
          <h2 className="text-white text-xl font-semibold mb-2">{userName}</h2>
          <div className="bg-black bg-opacity-50 px-4 py-2 rounded-full">
            <p className="text-white text-sm">{formatTime(duration)}</p>
          </div>
          <div className="mt-2 bg-primary px-3 py-1 rounded-full">
            <p className="text-white text-xs">₹{calculateCost()}</p>
          </div>
        </div>

        <div className="absolute bottom-32 right-4 w-24 h-32 bg-gray-800 rounded-2xl overflow-hidden border-2 border-white">
          <div className="w-full h-full flex items-center justify-center text-white text-xs">
            You
          </div>
        </div>
      </div>

      <div className="p-8 flex justify-center items-center space-x-6">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isMuted ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          {isMuted ? <MicOff className="text-white" size={24} /> : <Mic className="text-white" size={24} />}
        </button>

        <button
          onClick={onEnd}
          className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
        >
          <Phone className="text-white rotate-[135deg]" size={28} />
        </button>

        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          {isVideoOff ? <VideoOff className="text-white" size={24} /> : <Video className="text-white" size={24} />}
        </button>
      </div>
    </div>
  )
}
