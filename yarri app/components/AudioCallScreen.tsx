import { Phone, Mic, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface AudioCallScreenProps {
  userName: string
  userAvatar: string
  rate: number
  onEndCall: () => void
}

export default function AudioCallScreen({ userName, userAvatar, rate, onEndCall }: AudioCallScreenProps) {
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

  const cost = Math.ceil(duration / 60) * rate

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-orange-600 flex flex-col items-center justify-center p-8">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-40 h-40 rounded-full overflow-hidden bg-white/20 mb-8">
          <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">{userName}</h2>
        <p className="text-2xl text-white mb-2">{formatTime(duration)}</p>
        <p className="text-lg text-white/80">₹{cost}</p>
      </div>

      <div className="flex justify-center items-center space-x-6 mb-8">
        <button
          onClick={() => setIsSpeakerOn(!isSpeakerOn)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isSpeakerOn ? 'bg-white/30' : 'bg-red-500'}`}
        >
          <Volume2 className="text-white" size={24} />
        </button>

        <button
          onClick={onEndCall}
          className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Phone className="text-white rotate-[135deg]" size={28} />
        </button>
        
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isMuted ? 'bg-red-500' : 'bg-white/30'}`}
        >
          <Mic className="text-white" size={24} />
        </button>
      </div>
    </div>
  )
}
