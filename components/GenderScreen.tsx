import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface GenderScreenProps {
  onNext: () => void
}

export default function GenderScreen({ onNext }: GenderScreenProps) {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [selectedGender, setSelectedGender] = useState('female')

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <button className="self-start mb-6">
        <ChevronLeft size={24} className="text-gray-800" />
      </button>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">{t.selectGender}</h2>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-center space-x-4 mb-auto">
          <button
            onClick={() => setSelectedGender('male')}
            className={`px-8 py-3 rounded-full border-2 transition-colors text-base ${
              selectedGender === 'male'
                ? 'border-primary text-primary bg-orange-50'
                : 'border-gray-200 text-gray-700 bg-white'
            }`}
          >
            {t.male}
          </button>
          
          <button
            onClick={() => setSelectedGender('female')}
            className={`px-8 py-3 rounded-full border-2 transition-colors text-base ${
              selectedGender === 'female'
                ? 'border-primary text-primary bg-orange-50'
                : 'border-gray-200 text-gray-700 bg-white'
            }`}
          >
            {t.female}
          </button>
        </div>
        
        <button 
          onClick={onNext}
          className="w-full bg-primary text-white py-4 rounded-full font-semibold text-base mt-8"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}