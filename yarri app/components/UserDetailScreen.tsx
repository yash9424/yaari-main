import { ArrowLeft, Phone, User as UserIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface UserDetailScreenProps {
  onBack: () => void
  userId: string
  onStartCall: (data: { userName: string; userAvatar: string; rate: number; type: 'video' | 'audio' }) => void
}

export default function UserDetailScreen({ onBack, userId, onStartCall }: UserDetailScreenProps) {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [userId])

  const fetchUser = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const res = await fetch(`${apiUrl}/api/users/${userId}`)
      const data = await res.json()
      setUser(data)
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    )
  }

  const userName = user.name || 'User'
  const userAvatar = user.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
  return (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <button onClick={onBack}>
          <ArrowLeft size={24} className="text-gray-800" />
        </button>
      </div>

      <div className="px-6 pb-32">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
              {user.profilePic ? (
                <img src={user.profilePic} alt="User" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={64} className="text-gray-500" />
              )}
            </div>
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className={`text-xs font-medium ${user.isActive ? 'text-green-500' : 'text-gray-400'}`}>
                {user.isActive ? t.online : t.offline}
              </span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{userName}</h2>
          <p className="text-sm text-gray-600">{user.about || t.attributes}</p>
        </div>

        {user.about && (
          <div className="mb-6">
            <h3 className="text-primary font-semibold text-lg mb-2">{t.aboutMe}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {user.about}
            </p>
          </div>
        )}

        {user.gallery && user.gallery.length > 0 && (
          <div className="mb-6">
            <h3 className="text-primary font-semibold text-lg mb-3">{t.photoGallery}</h3>
            <div className="grid grid-cols-3 gap-2">
              {user.gallery.map((img: string, i: number) => (
                <img key={i} src={img} alt={`Gallery ${i}`} className="aspect-square object-cover rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {user.hobbies && user.hobbies.length > 0 && (
          <div className="mb-6">
            <h3 className="text-primary font-semibold text-lg mb-3">{t.hobbies}</h3>
            <div className="flex flex-wrap gap-2">
              {user.hobbies.map((hobby: string, i: number) => (
                <span key={i} className="bg-orange-50 text-gray-800 px-4 py-2 rounded-lg text-sm border border-gray-200">
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <div className="flex space-x-3">
          <button 
            onClick={() => onStartCall({ userName, userAvatar, rate: 10, type: 'video' })}
              className="flex-1 bg-primary text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            <span>₹10/min</span>
          </button>
          <button 
            onClick={() => onStartCall({ userName, userAvatar, rate: 5, type: 'audio' })}
            className="flex-1 bg-primary text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            <span>₹5/min</span>
          </button>
        </div>
      </div>
    </div>
  )
}
