import { Heart, User as UserIcon, Video, Phone } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import CallConfirmationScreen from './CallConfirmationScreen'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface UserListScreenProps {
  onNext: () => void
  onProfileClick: () => void
  onCoinClick: () => void
  onUserClick: (userId: string) => void
  onStartCall: (data: { userName: string; userAvatar: string; rate: number; type: 'video' | 'audio' }) => void
}

interface User {
  id: string
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
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    fetchUsers()
    fetchBalance()
  }, [])

  const fetchBalance = async () => {
    try {
      const user = localStorage.getItem('user')
      if (user) {
        const userData = JSON.parse(user)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
        const res = await fetch(`${apiUrl}/api/users/${userData.id}/balance`)
        const data = await res.json()
        if (res.ok) {
          setBalance(data.balance || 0)
        }
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const res = await fetch(`${apiUrl}/api/users`)
      const data = await res.json()
      
      const formattedUsers = data.map((user: any) => ({
        id: user._id,
        name: user.name || 'User',
        attributes: user.about || 'No description',
        status: user.isActive ? 'online' : 'offline',
        statusColor: user.isActive ? 'bg-green-500' : 'bg-gray-400',
        profilePic: user.profilePic,
      }))
      
      setUsers(formattedUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

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
        userAvatar: selectedCall.user.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCall.user.id}`,
        rate: selectedCall.rate,
        type: selectedCall.type
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2" style={{ alignItems: 'center' }}>
          <Heart className="text-primary" size={24} fill="#FF6B35" style={{ marginTop: '4px' }} />
          <h1 className="text-2xl font-bold text-primary" style={{ lineHeight: '24px' }}>Yaari</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onCoinClick}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
            style={{ alignItems: 'center' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700" style={{ marginTop: '2px' }}>
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
            </svg>
            <span className="text-gray-800 font-bold text-base" style={{ lineHeight: '20px' }}>₹{balance}</span>
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

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No users found
          </div>
        ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div 
              key={user.id} 
              onClick={() => onUserClick(user.id)}
              className="bg-white rounded-2xl p-4 flex items-center space-x-4 shadow-sm cursor-pointer active:bg-gray-50"
            >
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt="User" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 ${user.statusColor} rounded-full text-white text-xs font-medium flex items-center space-x-1`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="capitalize">{user.status === 'online' ? t.online : user.status === 'offline' ? t.offline : t.busy}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-primary font-bold text-lg mb-0.5">{user.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{user.attributes}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => handleCallClick(user, 'video', 10, e)}
                    className="flex-1 bg-primary text-white py-2 rounded-full flex items-center justify-center"
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Video size={16} fill="white" strokeWidth={0} />
                  </button>
                  <button 
                    onClick={(e) => handleCallClick(user, 'audio', 5, e)}
                    className="flex-1 bg-primary text-white py-2 rounded-full flex items-center justify-center"
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Phone size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {showCallModal && selectedCall && (
        <CallConfirmationScreen
          onClose={() => setShowCallModal(false)}
          onConfirm={handleConfirmCall}
          userName={selectedCall.user.name}
          callType={selectedCall.type}
          rate={selectedCall.rate}
          userAvatar={selectedCall.user.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCall.user.id}`}
        />
      )}
    </div>
  )
}
