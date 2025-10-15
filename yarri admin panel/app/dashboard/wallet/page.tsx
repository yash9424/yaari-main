'use client'
import { useEffect, useState } from 'react'
import { Search, Plus, Minus } from 'lucide-react'

export default function WalletPage() {
  const [wallets, setWallets] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/wallet')
      .then(res => res.json())
      .then(data => setWallets(data))
      .catch(() => {})
  }, [])

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Wallet Management</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search wallets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">User</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Phone</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Balance</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Total Spent</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wallets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No wallets found
                  </td>
                </tr>
              ) : (
                wallets.map((wallet: any) => (
                  <tr key={wallet._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full"></div>
                        <span className="font-medium">{wallet.userName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{wallet.phone}</td>
                    <td className="py-4 px-4 font-bold text-green-600">₹{wallet.balance}</td>
                    <td className="py-4 px-4 text-gray-600">₹{wallet.totalSpent || 0}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition">
                          <Plus size={16} />
                          <span className="text-sm">Add</span>
                        </button>
                        <button className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">
                          <Minus size={16} />
                          <span className="text-sm">Deduct</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
