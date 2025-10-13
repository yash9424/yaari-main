import { ArrowLeft, Shield, Lock, Eye, EyeOff, Bell, UserX } from 'lucide-react'

interface PrivacySecurityScreenProps {
  onBack: () => void
}

export default function PrivacySecurityScreen({ onBack }: PrivacySecurityScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center space-x-3 shadow-sm">
        <button onClick={onBack}>
          <ArrowLeft className="text-gray-700" size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Privacy & Security</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Account Security</h2>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Lock className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Change Password</p>
                <p className="text-xs text-gray-500">Update your password</p>
              </div>
            </div>
            <button className="text-primary font-semibold text-sm">Change</button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Shield className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Add extra security</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Privacy Settings</h2>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Eye className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Profile Visibility</p>
                <p className="text-xs text-gray-500">Who can see your profile</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Bell className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Show Online Status</p>
                <p className="text-xs text-gray-500">Let others see when you're online</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <UserX className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-gray-800">Blocked Users</p>
                <p className="text-xs text-gray-500">Manage blocked contacts</p>
              </div>
            </div>
            <button className="text-primary font-semibold text-sm">View</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Data & Privacy</h2>
          
          <button className="flex items-center justify-between py-2 w-full">
            <div className="flex items-center space-x-3">
              <Shield className="text-primary" size={20} />
              <p className="font-semibold text-gray-800">Privacy Policy</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="flex items-center justify-between py-2 w-full">
            <div className="flex items-center space-x-3">
              <Lock className="text-primary" size={20} />
              <p className="font-semibold text-gray-800">Terms of Service</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>
    </div>
  )
}
