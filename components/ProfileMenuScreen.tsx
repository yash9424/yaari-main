import { ChevronLeft, List, Phone, CreditCard, Shield, Headphones, LogOut, User } from 'lucide-react'

interface ProfileMenuScreenProps {
  onBack: () => void
}

export default function ProfileMenuScreen({ onBack }: ProfileMenuScreenProps) {
  const menuItems = [
    { icon: List, label: 'Transaction History', bgColor: 'bg-orange-50' },
    { icon: Phone, label: 'Call History', bgColor: 'bg-orange-50' },
    { icon: CreditCard, label: 'Purchase History', bgColor: 'bg-orange-50' },
    { icon: Shield, label: 'Privacy & Security', bgColor: 'bg-orange-50' },
    { icon: Headphones, label: 'Customer Support', bgColor: 'bg-orange-50' },
    { icon: LogOut, label: 'Log Out', bgColor: 'bg-orange-50' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <button onClick={onBack} className="mb-6">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex items-center justify-center overflow-hidden">
            <User size={64} className="text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            User Name
            <span className="ml-2 text-red-500">♀</span>
          </h2>
          <p className="text-gray-600 text-sm">+91 9876798877</p>
        </div>

        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-4 p-4 ${item.bgColor} rounded-2xl transition-colors hover:bg-orange-100`}
            >
              <item.icon size={20} className="text-gray-800" />
              <span className="text-gray-800 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
