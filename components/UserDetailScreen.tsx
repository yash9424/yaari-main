import { ArrowLeft, Phone } from 'lucide-react'

interface UserDetailScreenProps {
  onBack: () => void
  userId: number
  onStartCall: (data: { userName: string; userAvatar: string; rate: number; type: 'video' | 'audio' }) => void
}

export default function UserDetailScreen({ onBack, userId, onStartCall }: UserDetailScreenProps) {
  const userName = 'User Name'
  const userAvatar = `https://api.dicebear.com/7.x/big-smile/svg?seed=User${userId}`
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
            <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
              <img src="/api/placeholder/128/128" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-500">Online</span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900">User Name</h2>
          <p className="text-sm text-gray-600">Attributes</p>
        </div>

        <div className="mb-6">
          <h3 className="text-primary font-semibold text-lg mb-2">About Me</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-primary font-semibold text-lg mb-3">Photo gallery</h3>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-primary font-semibold text-lg mb-3">Hobbies</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-orange-50 text-gray-800 px-4 py-2 rounded-lg text-sm border border-gray-200">Hobby 01</span>
            <span className="bg-orange-50 text-gray-800 px-4 py-2 rounded-lg text-sm border border-gray-200">Hobby 01</span>
            <span className="bg-orange-50 text-gray-800 px-4 py-2 rounded-lg text-sm border border-gray-200">Hobby 01</span>
            <span className="bg-orange-50 text-gray-800 px-4 py-2 rounded-lg text-sm border border-gray-200">Hobby 01</span>
            <span className="bg-orange-50 text-gray-800 px-4 py-2 rounded-lg text-sm border border-gray-200">Hobby 01</span>
          </div>
        </div>
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
