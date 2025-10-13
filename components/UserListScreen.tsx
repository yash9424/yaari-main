import { Heart, User as UserIcon, Video, Phone } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import CallConfirmationScreen from './CallConfirmationScreen'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface UserListScreenProps {
  onNext: () => void
  onProfileClick: () => void
  onCoinClick: () => void
  onUserClick: (userId: number) => void
  onStartCall: (data: { userName: string; userAvatar: string; rate: number; type: 'video' | 'audio' }) => void
}

interface User {
  id: number
  name: string
  attributes: string
  status: 'online' | 'offline' | 'busy'
  statusColor: string
}

export default function UserListScreen({ onNext, onProfileClick, onCoinClick, onUserClick, onStartCall }: UserListScreenProps) {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [showCallModal, setShowCallModal] = useState(false)
  const [selectedCall, setSelectedCall] = useState<{ user: User; type: 'video' | 'audio'; rate: number } | null>(null)

  const users: User[] = [
    { id: 1, name: lang === 'hi' ? 'उपयोगकर्ता नाम' : 'User Name', attributes: lang === 'hi' ? 'विशेषताएं' : 'Attributes', status: 'online', statusColor: 'bg-green-500' },
    { id: 2, name: lang === 'hi' ? 'उपयोगकर्ता नाम' : 'User Name', attributes: lang === 'hi' ? 'विशेषताएं' : 'Attributes', status: 'online', statusColor: 'bg-green-500' },
    { id: 3, name: lang === 'hi' ? 'उपयोगकर्ता नाम' : 'User Name', attributes: lang === 'hi' ? 'विशेषताएं' : 'Attributes', status: 'busy', statusColor: 'bg-red-500' },
    { id: 4, name: lang === 'hi' ? 'उपयोगकर्ता नाम' : 'User Name', attributes: lang === 'hi' ? 'विशेषताएं' : 'Attributes', status: 'offline', statusColor: 'bg-gray-400' },
  ]

  const handleCallClick = (user: User, type: 'video' | 'audio', rate: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedCall({ user, type, rate })
    setShowCallModal(true)
  }

  const handleConfirmCall = () => {
    if (selectedCall) {
      setShowCallModal(false)
      onStartCall({
        userName: selectedCall.user.name,
        userAvatar: `https://api.dicebear.com/7.x/big-smile/svg?seed=User${selectedCall.user.id}`,
        rate: selectedCall.rate,
        type: selectedCall.type
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <Heart className="text-primary" size={24} fill="#FF6B35" />
          <h1 className="text-2xl font-bold text-primary">Yaari</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onCoinClick}
            className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center"
          >
            <Image 
              src="/images/bitcoin-icons_transactions-outline.svg" 
              alt="coins" 
              width={20} 
              height={20}
            />
          </button>
          <button 
            onClick={onProfileClick}
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"
          >
            <UserIcon className="text-white" size={20} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl h-40 mb-4"></div>

        <div className="space-y-3">
          {users.map((user) => (
            <div 
              key={user.id} 
              onClick={() => onUserClick(user.id)}
              className="bg-white rounded-2xl p-4 flex items-center space-x-4 shadow-sm cursor-pointer active:bg-gray-50"
            >
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${user.id}`} alt="User" className="w-full h-full object-cover" />
                </div>
                <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 ${user.statusColor} rounded-full text-white text-xs font-medium flex items-center space-x-1`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="capitalize">{user.status === 'online' ? t.online : user.status === 'offline' ? t.offline : t.busy}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-primary font-bold text-lg mb-0.5">{user.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{user.attributes}</p>
                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => handleCallClick(user, 'video', 10, e)}
                    className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center gap-1.5 leading-none"
                  >
                    <Video size={14} fill="white" strokeWidth={0} className="flex-shrink-0" />
                    <span className="pt-0.5">₹10/min</span>
                  </button>
                  <button 
                    onClick={(e) => handleCallClick(user, 'audio', 5, e)}
                    className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center gap-1.5 leading-none"
                  >
                    <Phone size={14} strokeWidth={2} className="flex-shrink-0" />
                    <span className="pt-0.5">₹5/min</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCallModal && selectedCall && (
        <CallConfirmationScreen
          onClose={() => setShowCallModal(false)}
          onConfirm={handleConfirmCall}
          userName={selectedCall.user.name}
          callType={selectedCall.type}
          rate={selectedCall.rate}
          userAvatar={`https://api.dicebear.com/7.x/big-smile/svg?seed=User${selectedCall.user.id}`}
        />
      )}
    </div>
  )
}
