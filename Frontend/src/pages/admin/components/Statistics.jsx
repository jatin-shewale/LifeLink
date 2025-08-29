import React, { useState, useEffect } from 'react'
import { FaTint, FaHandHoldingHeart, FaChartBar, FaUsers, FaDonate, FaInbox } from 'react-icons/fa'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { useAuthStore } from '../../../store/auth'
import { toast } from 'react-toastify'

const Statistics = () => {
  const { token } = useAuthStore()
  const [stats, setStats] = useState({
    bloodStats: [],
    organStats: [],
    weeklyData: [],
    monthlyData: [],
    userStats: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatistics()
  }, [])

  const fetchStatistics = async () => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/admin/statistics', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      } else {
        toast.error('Failed to fetch statistics')
      }
    } catch (error) {
      console.error('Failed to fetch statistics:', error)
      toast.error('Failed to fetch statistics')
    } finally {
      setLoading(false)
    }
  }

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'O+': '#ef4444', 'O-': '#dc2626',
      'A+': '#f97316', 'A-': '#ea580c',
      'B+': '#eab308', 'B-': '#ca8a04',
      'AB+': '#22c55e', 'AB-': '#16a34a'
    }
    return colors[bloodType] || '#6b7280'
  }

  const getOrganColor = (organ) => {
    const colors = {
      'Kidney': '#3b82f6', 'Liver': '#8b5cf6',
      'Heart': '#ec4899', 'Lung': '#06b6d4',
      'Pancreas': '#f59e0b', 'Cornea': '#10b981'
    }
    return colors[organ] || '#6b7280'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading statistics...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Detailed Statistics</h3>
        <p className="text-gray-600">Comprehensive analytics and inventory management</p>
      </div>

      {/* User Role Distribution */}
      <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <FaUsers className="text-blue-600" />
          User Role Distribution
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.userStats.map((stat) => (
            <div key={stat._id} className="p-4 border rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900 capitalize">{stat._id}</div>
              <div className="text-2xl font-bold text-blue-600">{stat.count}</div>
              <div className="text-sm text-gray-600">Users</div>
            </div>
          ))}
        </div>
      </div>

      {/* Blood Inventory */}
      <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <FaTint className="text-red-600" />
          Blood Inventory Status
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.bloodStats.map((stat) => (
            <div key={stat._id} className="p-4 border rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{stat._id}</div>
                <div className="text-sm text-gray-600">Available: {stat.available}</div>
                <div className="text-sm text-gray-600">Needed: {Math.floor(stat.available * 0.3)}</div>
                <div className={`text-sm font-medium mt-1 ${
                  stat.available >= Math.floor(stat.available * 0.3) ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.available >= Math.floor(stat.available * 0.3) ? 'Sufficient' : 'Critical'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Organ Inventory */}
      <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <FaHandHoldingHeart className="text-green-600" />
          Organ Inventory Status
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.organStats.map((stat) => (
            <div key={stat._id} className="p-4 border rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{stat._id}</div>
                <div className="text-sm text-gray-600">Available: {stat.available}</div>
                <div className="text-sm text-gray-600">Needed: {Math.floor(stat.available * 0.4)}</div>
                <div className={`text-sm font-medium mt-1 ${
                  stat.available >= Math.floor(stat.available * 0.4) ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.available >= Math.floor(stat.available * 0.4) ? 'Sufficient' : 'Critical'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity Chart */}
      {stats.weeklyData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaChartBar className="text-purple-600" />
            Weekly Donation Activity
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.weeklyData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="donations" stroke="#22c55e" strokeWidth={2} name="Donations" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Monthly Activity Chart */}
      {stats.monthlyData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaChartBar className="text-blue-600" />
            Monthly Donation Activity
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="donations" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Blood Type Distribution Chart */}
      {stats.bloodStats.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
          <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaTint className="text-red-600" />
            Blood Type Distribution
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.bloodStats.map(stat => ({
                    name: stat._id,
                    value: stat.available,
                    color: getBloodTypeColor(stat._id)
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.bloodStats.map((stat, index) => (
                    <Cell key={`cell-${index}`} fill={getBloodTypeColor(stat._id)} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default Statistics
