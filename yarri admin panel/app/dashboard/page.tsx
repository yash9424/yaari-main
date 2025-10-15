'use client'
import { useEffect, useState } from 'react'
import { Users, DollarSign, Phone, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalCalls: 0,
    activeUsers: 0,
  })

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {})
  }, [])

  const cards = [
    { icon: Users, label: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500' },
    { icon: DollarSign, label: 'Total Revenue', value: `₹${stats.totalRevenue}`, color: 'bg-green-500' },
    { icon: Phone, label: 'Total Calls', value: stats.totalCalls, color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'Active Users', value: stats.activeUsers, color: 'bg-orange-500' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-xl`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Users</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-800">User {i}</p>
                    <p className="text-sm text-gray-500">user{i}@example.com</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Today</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">Payment #{i}</p>
                  <p className="text-sm text-gray-500">User {i}</p>
                </div>
                <span className="font-bold text-green-600">₹{i * 100}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
