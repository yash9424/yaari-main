import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface TransactionHistoryScreenProps {
  onBack: () => void
}

export default function TransactionHistoryScreen({ onBack }: TransactionHistoryScreenProps) {
  const { lang } = useLanguage()
  const t = translations[lang]
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
        <h1 className="text-3xl font-bold text-black">{t.transactionHistory}</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-8 mt-20">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t.needHelp}</h2>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{t.understanding}</h2>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{t.yourTransactions}</h2>
          
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {t.questionsText} <span className="text-primary font-medium">support@yaari.me</span>
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            {t.ourTeam}
          </p>
        </div>
      </div>
    </div>
  )
}