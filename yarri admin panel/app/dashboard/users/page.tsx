'use client'
import { useEffect, useState } from 'react'
import { Search, Edit, Trash2, Eye } from 'lucide-react'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => {})
  }, [])

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
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
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Gender</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Balance</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full"></div>
                        <span className="font-medium">{user.name || 'User'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{user.phone}</td>
                    <td className="py-4 px-4">{user.gender}</td>
                    <td className="py-4 px-4">₹{user.balance || 0}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Eye size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit size={18} className="text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Trash2 size={18} className="text-red-600" />
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
