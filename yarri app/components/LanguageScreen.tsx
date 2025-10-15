import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'

interface LanguageScreenProps {
  onNext: () => void
  onSelectLanguage: (lang: 'en' | 'hi') => void
}

export default function LanguageScreen({ onNext, onSelectLanguage }: LanguageScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('हिंदी')

  const handleNext = () => {
    onSelectLanguage(selectedLanguage === 'English' ? 'en' : 'hi')
    onNext()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      <button className="self-start mb-6">
        <ChevronLeft size={24} className="text-gray-800" />
      </button>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Select Language</h2>
      
      <div className="flex-1 flex flex-col">
        <div className="space-y-4 mb-auto">
          {[
            { label: 'English', value: 'English' },
            { label: 'हिंदी', value: 'हिंदी' }
          ].map((language) => (
            <button
              key={language.value}
              onClick={() => setSelectedLanguage(language.value)}
              className={`w-full p-4 rounded-full border-2 transition-colors text-base flex items-center justify-center ${
                selectedLanguage === language.value
                  ? 'border-primary text-primary bg-orange-50'
                  : 'border-gray-200 text-gray-700 bg-white'
              }`}
            >
              {language.label}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="w-full bg-primary text-white py-4 rounded-full font-semibold text-base mt-8 flex items-center justify-center"
        >
          Next
        </button>
      </div>
    </div>
  )
}