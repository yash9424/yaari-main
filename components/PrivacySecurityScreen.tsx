import { ArrowLeft, Shield, Lock, Eye, EyeOff, Bell, UserX } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface PrivacySecurityScreenProps {
  onBack: () => void
}

export default function PrivacySecurityScreen({ onBack }: PrivacySecurityScreenProps) {
  const { lang } = useLanguage()
  const t = translations[lang]
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center space-x-3 shadow-sm">
        <button onClick={onBack}>
          <ArrowLeft className="text-gray-700" size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{t.privacySecurityTitle}</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">{t.accountSecurity}</h2>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Lock className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-gray-800">{t.changePassword}</p>
                <p className="text-xs text-gray-500">{t.updatePassword}</p>
              </div>
            </div>
            <button className="text-primary font-semibold text-sm">{t.change}</button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Shield className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-gray-800">{t.twoFactorAuth}</p>
                <p className="text-xs text-gray-500">{t.addExtraSecurity}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">{t.privacySettings}</h2>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Eye className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-gray-800">{t.profileVisibility}</p>
                <p className="text-xs text-gray-500">{t.whoCanSee}</p>
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
                <p className="font-semibold text-gray-800">{t.showOnlineStatus}</p>
                <p className="text-xs text-gray-500">{t.letOthersSee}</p>
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
                <p className="font-semibold text-gray-800">{t.blockedUsers}</p>
                <p className="text-xs text-gray-500">{t.manageBlocked}</p>
              </div>
            </div>
            <button className="text-primary font-semibold text-sm">{t.view}</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">{t.dataPrivacy}</h2>
          
          <button className="flex items-center justify-between py-2 w-full">
            <div className="flex items-center space-x-3">
              <Shield className="text-primary" size={20} />
              <p className="font-semibold text-gray-800">{t.privacyPolicy}</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>

          <button className="flex items-center justify-between py-2 w-full">
            <div className="flex items-center space-x-3">
              <Lock className="text-primary" size={20} />
              <p className="font-semibold text-gray-800">{t.termsOfService}</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>
    </div>
  )
}
