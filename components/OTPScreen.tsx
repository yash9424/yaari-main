import { useState, useRef } from 'react'

interface OTPScreenProps {
  onNext: () => void
}

export default function OTPScreen({ onNext }: OTPScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/loginScreenBackgroundImage.png)' }}
      />
      
      <div className="relative z-10 bg-white rounded-3xl p-6 shadow-lg max-w-sm w-full">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-2">Enter OTP sent to</h2>
          <p className="text-gray-600 text-sm">+91 9999999999</p>
        </div>
        
        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-11 h-11 border-2 border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:border-primary bg-white"
            />
          ))}
        </div>
        
        <button 
          onClick={() => {
            setIsVerifying(true)
            setTimeout(() => {
              setIsVerifying(false)
              setIsVerified(true)
              setTimeout(() => {
                onNext()
              }, 500)
            }, 1500)
          }}
          disabled={isVerifying || isVerified}
          className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-base mb-3 flex items-center justify-center relative overflow-hidden"
        >
          {isVerifying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {isVerified && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          <span className={isVerifying || isVerified ? 'opacity-0' : 'opacity-100'}>
            Verify & Continue
          </span>
        </button>
        
        <button 
          onClick={() => setIsConfirmed(!isConfirmed)}
          className="text-center text-xs text-gray-600 flex items-center justify-center w-full"
        >
          <span className={`inline-block w-4 h-4 rounded-sm mr-2 flex items-center justify-center text-white text-xs border-2 transition-colors ${
            isConfirmed ? 'bg-primary border-primary' : 'bg-white border-gray-300'
          }`}>
            {isConfirmed && '✓'}
          </span>
          I Confirm I'm 18+
        </button>
      </div>
    </div>
  )
}