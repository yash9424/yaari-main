import { User, Plus, X } from 'lucide-react'
import { useState } from 'react'

interface EditProfileScreenProps {
  onBack: () => void
}

export default function EditProfileScreen({ onBack }: EditProfileScreenProps) {
  const [userName, setUserName] = useState('User Name')
  const [phoneNumber, setPhoneNumber] = useState('+91 9879879877')
  const [aboutMe, setAboutMe] = useState('')
  const [hobbies, setHobbies] = useState<string[]>(['Hobby 01', 'Hobby 02'])
  const [newHobby, setNewHobby] = useState('')
  const [images, setImages] = useState<number[]>([1, 2, 3])

  const addHobby = () => {
    if (newHobby.trim()) {
      setHobbies([...hobbies, newHobby.trim()])
      setNewHobby('')
    }
  }

  const removeHobby = (index: number) => {
    setHobbies(hobbies.filter((_, i) => i !== index))
  }

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
      <div className="px-4 space-y-6 pb-24">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="User Name"
          className="w-full p-4 border border-gray-300 rounded-full text-base focus:outline-none focus:border-primary bg-gray-50"
          style={{ fontSize: '16px' }}
        />
        
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="w-full p-4 border border-gray-300 rounded-full text-base focus:outline-none focus:border-primary bg-gray-50"
          style={{ fontSize: '16px' }}
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">About Me</label>
          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-2xl text-base focus:outline-none focus:border-primary bg-gray-50 resize-none"
            style={{ fontSize: '16px' }}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Photo Gallery</label>
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden">
                <button className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X size={14} className="text-white" />
                </button>
              </div>
            ))}
            <button className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <Plus size={24} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Hobbies</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {hobbies.map((hobby, i) => (
              <span key={i} className="bg-orange-50 text-gray-800 px-4 py-2 rounded-full text-sm border border-gray-200 flex items-center gap-2">
                {hobby}
                <button onClick={() => removeHobby(i)}>
                  <X size={14} className="text-gray-600" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHobby()}
              placeholder="Add a hobby"
              className="flex-1 p-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-primary bg-gray-50"
              style={{ fontSize: '16px' }}
            />
            <button onClick={addHobby} className="px-4 py-3 bg-primary text-white rounded-full font-semibold text-sm whitespace-nowrap">
              Add
            </button>
          </div>
        </div>
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