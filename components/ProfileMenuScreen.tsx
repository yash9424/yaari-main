import { ChevronLeft, List, Phone, Shield, Headphones, LogOut, User, Edit2 } from 'lucide-react'

interface ProfileMenuScreenProps {
  onBack: () => void
  onCallHistory: () => void
  onTransactionHistory: () => void
  onCustomerSupport: () => void
  onEditProfile: () => void
  onPrivacySecurity: () => void
}

export default function ProfileMenuScreen({ onBack, onCallHistory, onTransactionHistory, onCustomerSupport, onEditProfile, onPrivacySecurity }: ProfileMenuScreenProps) {
  const menuItems = [
    { icon: List, label: 'Transaction History', bgColor: 'bg-orange-50' },
    { icon: Phone, label: 'Call History', bgColor: 'bg-orange-50' },
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

        <div className="flex flex-col items-center mb-8 relative">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User1" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button onClick={onEditProfile} className="absolute top-0 right-0 w-8 h-8 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow-sm">
              <Edit2 size={14} className="text-primary" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-800">User Name</h2>
          <p className="text-gray-600 text-sm">+91 9876798877</p>
        </div>

        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={
                item.label === 'Call History' ? onCallHistory :
                item.label === 'Transaction History' ? onTransactionHistory :
                item.label === 'Customer Support' ? onCustomerSupport :
                item.label === 'Privacy & Security' ? onPrivacySecurity :
                undefined
              }
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
