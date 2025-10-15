import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface CoinPurchaseScreenProps {
  onBack: () => void
}

export default function CoinPurchaseScreen({ onBack }: CoinPurchaseScreenProps) {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      fetchBalance(userData.id)
    }
  }, [])

  const fetchBalance = async (userId: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      const res = await fetch(`${apiUrl}/api/users/${userId}/balance`)
      const data = await res.json()
      if (res.ok) {
        setBalance(data.balance || 0)
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        user.balance = data.balance
        localStorage.setItem('user', JSON.stringify(user))
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }
  const coinPackages = [
    { coins: 50, originalPrice: 100, price: 50 },
    { coins: 50, originalPrice: 100, price: 50 },
    { coins: 50, originalPrice: 100, price: 50 },
    { coins: 50, originalPrice: 100, price: 50 },
    { coins: 50, originalPrice: 100, price: 50 },
    { coins: 50, originalPrice: 100, price: 50 },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4">
        <button onClick={onBack} className="mb-6">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>

        <div className="bg-orange-50 rounded-2xl p-6 mb-4 flex items-center">
          <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mr-4">
            <span className="text-white text-3xl font-bold">Y</span>
          </div>
          <div>
            <p className="text-gray-700 text-sm mb-1">Total Coin Balance</p>
            <p className="text-3xl font-bold">₹{balance}</p>
          </div>
        </div>

        <div className="border-t border-gray-300 my-6"></div>

        <h2 className="text-orange-500 font-semibold text-lg mb-4">Add More Coins</h2>

        <div className="flex justify-between items-center mb-6 bg-gray-50 p-3 rounded-lg">
          <input
            type="text"
            placeholder="Enter no of coins"
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <span className="text-gray-600 text-sm">INR 0.0</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {coinPackages.map((pkg, index) => (
            <button
              key={index}
              className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-center mb-2">
                <Image 
                  src="/images/bitcoin-icons_transactions-outline.svg" 
                  alt="coin" 
                  width={18} 
                  height={18}
                  className="mr-1"
                />
                <span className="text-2xl font-bold">{pkg.coins}</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 line-through">₹{pkg.originalPrice}</p>
                <p className="text-sm font-semibold text-black">₹{pkg.price}</p>
              </div>
            </button>
          ))}
        </div>

        <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-semibold text-base hover:bg-orange-600 transition-colors">
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}
