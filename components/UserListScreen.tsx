import { Heart, User as UserIcon } from 'lucide-react'
import Image from 'next/image'

interface UserListScreenProps {
  onNext: () => void
  onProfileClick: () => void
  onCoinClick: () => void
  onUserClick: (userId: number) => void
}

interface User {
  id: number
  name: string
  attributes: string
  status: 'online' | 'offline' | 'busy'
  statusColor: string
}

export default function UserListScreen({ onNext, onProfileClick, onCoinClick, onUserClick }: UserListScreenProps) {
  const users: User[] = [
    { id: 1, name: 'User Name', attributes: 'Attributes', status: 'online', statusColor: 'bg-green-500' },
    { id: 2, name: 'User Name', attributes: 'Attributes', status: 'online', statusColor: 'bg-green-500' },
    { id: 3, name: 'User Name', attributes: 'Attributes', status: 'busy', statusColor: 'bg-red-500' },
    { id: 4, name: 'User Name', attributes: 'Attributes', status: 'offline', statusColor: 'bg-gray-400' },
  ]

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
        <div className="bg-orange-100 rounded-2xl h-40 mb-4"></div>

        <div className="space-y-4">
          {users.map((user) => (
            <div 
              key={user.id} 
              onClick={() => onUserClick(user.id)}
              className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer active:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className={`absolute bottom-0 right-0 w-4 h-4 ${user.statusColor} rounded-full border-2 border-white flex items-center justify-center`}>
                    {user.status === 'online' && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-primary font-semibold text-base">{user.name}</h3>
                  <p className="text-gray-600 text-sm">{user.attributes}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <span>₹10/min</span>
                </button>
                <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <span>₹5/min</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
