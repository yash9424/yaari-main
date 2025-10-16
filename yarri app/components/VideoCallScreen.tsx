'use client'
import { Phone, Mic, Video } from 'lucide-react'
import { useState, useEffect } from 'react'
import AgoraRTC, { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng'
import { agoraConfig } from '../config/agora'

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
  const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | null>(null)
  const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | null>(null)
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([])
  const [client] = useState(() => AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }))

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const init = async () => {
      try {
        const channelName = sessionStorage.getItem('channelName') || `call_${Date.now()}`
        await client.join(agoraConfig.appId, channelName, null, null)
        
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack()
        const videoTrack = await AgoraRTC.createCameraVideoTrack()
        
        setLocalAudioTrack(audioTrack)
        setLocalVideoTrack(videoTrack)
        
        await client.publish([audioTrack, videoTrack])
        
        videoTrack.play('local-video')
      } catch (error) {
        console.error('Agora init error:', error)
      }
    }

    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType)
      if (mediaType === 'video') {
        setRemoteUsers(prev => [...prev, user])
        setTimeout(() => user.videoTrack?.play('remote-video'), 100)
      }
      if (mediaType === 'audio') {
        user.audioTrack?.play()
      }
    })

    client.on('user-unpublished', (user) => {
      setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid))
    })

    init()

    return () => {
      localVideoTrack?.close()
      localAudioTrack?.close()
      client.leave()
    }
  }, [])

  const toggleMute = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setEnabled(isMuted)
      setIsMuted(!isMuted)
    }
  }

  const toggleVideo = async () => {
    if (localVideoTrack) {
      await localVideoTrack.setEnabled(isVideoOff)
      setIsVideoOff(!isVideoOff)
    }
  }

  const handleEndCall = () => {
    localVideoTrack?.close()
    localAudioTrack?.close()
    client.leave()
    onEndCall()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const cost = Math.ceil(duration / 60) * rate

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 relative">
        <div id="remote-video" className="absolute inset-0 bg-gray-800">
          {remoteUsers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute top-8 left-0 right-0 text-center text-white z-10">
          <h2 className="text-2xl font-bold mb-2">{userName}</h2>
          <p className="text-lg">{formatTime(duration)}</p>
          <p className="text-sm text-gray-400 mt-1">₹{cost}</p>
        </div>

        <div id="local-video" className="absolute bottom-32 left-4 w-24 h-32 bg-gray-800 rounded-lg overflow-hidden z-10" />
      </div>

      <div className="p-8 flex justify-center items-center space-x-6">
        <button
          onClick={toggleMute}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isMuted ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          <Mic className="text-white" size={24} />
        </button>
        
        <button
          onClick={handleEndCall}
          className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
        >
          <Phone className="text-white rotate-[135deg]" size={28} />
        </button>
        
        <button
          onClick={toggleVideo}
          className={`w-14 h-14 rounded-full flex items-center justify-center ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'}`}
        >
          <Video className="text-white" size={24} />
        </button>
      </div>
    </div>
  )
}
