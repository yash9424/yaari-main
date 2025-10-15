import { useState } from 'react'

interface LoginScreenProps {
  onNext: () => void
}

export default function LoginScreen({ onNext }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '')
    if (value.startsWith('91')) {
      value = value.slice(2)
    }
    if (value.length <= 10) {
      setPhoneNumber(value)
    }
  }

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      alert('Please enter valid 10 digit phone number')
      return
    }
    
    setLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const res = await fetch(`${apiUrl}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber }),
      })
      
      if (res.ok) {
        localStorage.setItem('phone', phoneNumber)
        onNext()
      } else {
        alert('Failed to send OTP')
      }
    } catch (error) {
      alert('Error sending OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/loginScreenBackgroundImage.png)' }}
      />
      
      <div 
        className={`absolute left-0 right-0 bg-white rounded-t-3xl p-8 shadow-lg transition-all duration-300 z-10 ${
          isFocused ? 'bottom-0' : 'bottom-0'
        }`}
        style={{
          paddingBottom: isFocused ? 'env(safe-area-inset-bottom, 20px)' : '32px'
        }}
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-primary mb-2">Yaari</h1>
          <p className="text-gray-600 text-sm">Connect with real people</p>
        </div>
        
        <div className="mb-4 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-gray-700">+91</span>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Enter your Phone Number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full p-4 pl-14 border border-gray-300 rounded-full text-base focus:outline-none focus:border-primary bg-gray-50"
          />
        </div>
        
        <button 
          onClick={handleSendOTP}
          disabled={loading}
          className="w-full bg-primary text-white py-4 rounded-full font-semibold text-base mb-3 disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? 'Sending...' : 'Get OTP'}
        </button>
        
        <p className="text-center text-xs text-primary">Terms & Condition</p>
      </div>
    </div>
  )
}