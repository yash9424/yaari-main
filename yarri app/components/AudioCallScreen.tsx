import { Phone, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useState, useEffect } from 'react'

interface AudioCallScreenProps {
  onEnd: () => void
  userName: string
  userAvatar: string
  rate: number
}

export default function AudioCallScreen({ onEnd, userName, userAvatar, rate }: AudioCallScreenProps) {
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)

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
    <div className="fixed inset-0 bg-gradient-to-b from-primary to-orange-600 flex flex-col items-center justify-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full overflow-hidden mb-6 border-4 border-white">
          <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
        </div>

        <h2 className="text-white text-2xl font-bold mb-2">{userName}</h2>
        <p className="text-white text-opacity-80 text-sm mb-4">Audio Call</p>

        <div className="bg-white bg-opacity-20 px-6 py-3 rounded-full mb-2">
          <p className="text-white text-xl font-semibold">{formatTime(duration)}</p>
        </div>

        <div className="bg-white px-4 py-1 rounded-full">
          <p className="text-primary text-sm font-semibold">₹{calculateCost()}</p>
        </div>
      </div>

      <div className="p-8 flex justify-center items-center space-x-6 mb-8">
        <button
          onClick={() => setIsSpeakerOn(!isSpeakerOn)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isSpeakerOn ? 'bg-white bg-opacity-30' : 'bg-white bg-opacity-10'}`}
        >
          {isSpeakerOn ? <Volume2 className="text-white" size={24} /> : <VolumeX className="text-white" size={24} />}
        </button>

        <button
          onClick={onEnd}
          className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Phone className="text-white rotate-[135deg]" size={28} />
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isMuted ? 'bg-red-500' : 'bg-white bg-opacity-30'}`}
        >
          {isMuted ? <MicOff className="text-white" size={24} /> : <Mic className="text-white" size={24} />}
        </button>
      </div>
    </div>
  )
}
