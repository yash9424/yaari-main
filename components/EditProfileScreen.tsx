import { User } from 'lucide-react'
import { useState } from 'react'

interface EditProfileScreenProps {
  onBack: () => void
}

export default function EditProfileScreen({ onBack }: EditProfileScreenProps) {
  const [userName, setUserName] = useState('User Name')
  const [phoneNumber, setPhoneNumber] = useState('+91 9879879877')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 pt-8">
        <button onClick={onBack} className="mr-3">
          <span className="text-2xl text-black">←</span>
        </button>
      </div>

      {/* Title */}
      <div className="px-4 pb-6">
        <h1 className="text-3xl font-bold text-black">Edit Profile</h1>
      </div>

      {/* Profile Picture Section */}
      <div className="flex items-center px-4 mb-8">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden mr-4">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User1" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <button className="px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold">
          Upload Picture
        </button>
      </div>

      {/* Form Fields */}
      <div className="px-4 space-y-4">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-full text-base focus:outline-none focus:border-primary bg-gray-50"
          style={{ fontSize: '16px' }}
        />
        
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-full text-base focus:outline-none focus:border-primary bg-gray-50"
          style={{ fontSize: '16px' }}
        />
      </div>

      {/* Save Button */}
      <div className="fixed bottom-8 left-4 right-4">
        <button className="w-full bg-primary text-white py-4 rounded-full font-semibold text-lg">
          Save Changes
        </button>
      </div>
    </div>
  )
}