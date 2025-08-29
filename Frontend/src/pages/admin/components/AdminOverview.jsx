import React, { useState, useEffect } from 'react'
import { 
  FaUsers, FaDonate, FaInbox, FaExclamationTriangle, FaChartBar, 
  FaTint, FaHandHoldingHeart, FaClock, FaBell, FaUserCircle, 
  FaHeart, FaCalendarAlt, FaPhone, FaEnvelope, FaInfoCircle, 
  FaShieldAlt, FaHospital, FaAmbulance, FaStethoscope, FaClipboardList
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { useAuthStore } from '../../../store/auth'
import { toast } from 'react-toastify'
import KPICard from './KPICard'
import QuickActionCard from './QuickActionCard'
import ActivityItem from './ActivityItem'

const AdminOverview = () => {
  const { token } = useAuthStore()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    totalRequests: 0,
    pendingRequests: 0,
    emergencyRequests: 0,
    bloodInventory: [],
    organInventory: [],
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/admin/overview', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setStats({
          totalUsers: data.users || 0,
          totalDonations: data.donations || 0,
          totalRequests: data.requests || 0,
          pendingRequests: data.pendingRequests || 0,
          emergencyRequests: data.emergencyRequests || 0,
          bloodInventory: data.bloodInventory || [],
          organInventory: data.organInventory || [],
          recentActivity: data.recentActivity || []
        })
      } else {
        toast.error('Failed to fetch statistics')
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      toast.error('Failed to fetch statistics')
    } finally {
      setLoading(false)
    }
  }

  const bloodTypeData = (stats.bloodInventory || []).map(item => ({
    name: item._id,
    value: item.count,
    color: getBloodTypeColor(item._id)
  }))

  const organData = (stats.organInventory || []).map(item => ({
    name: item._id,
    value: item.count,
    color: getOrganColor(item._id)
  }))

  const weeklyData = [
    { day: 'Mon', donations: 12, requests: 8 },
    { day: 'Tue', donations: 15, requests: 10 },
    { day: 'Wed', donations: 18, requests: 12 },
    { day: 'Thu', donations: 14, requests: 9 },
    { day: 'Fri', donations: 20, requests: 15 },
    { day: 'Sat', donations: 16, requests: 11 },
    { day: 'Sun', donations: 13, requests: 7 }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Manage donors, recipients, and coordinate life-saving donations
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPICard icon={<FaUsers />} label="Total Users" value={stats.totalUsers} color="blue" />
        <KPICard icon={<FaDonate />} label="Total Donations" value={stats.totalDonations} color="green" />
        <KPICard icon={<FaInbox />} label="Pending Requests" value={stats.pendingRequests} color="orange" />
        <KPICard icon={<FaExclamationTriangle />} label="Emergency Requests" value={stats.emergencyRequests} color="red" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaChartBar className="text-blue-600" />
            Weekly Activity
          </h3>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="donations" stroke="#22c55e" strokeWidth={2} name="Donations" />
                <Line type="monotone" dataKey="requests" stroke="#ef4444" strokeWidth={2} name="Requests" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Blood Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaTint className="text-red-600" />
            Blood Type Distribution
          </h3>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bloodTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {bloodTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard to="requests" icon={<FaInbox />} title="Manage Requests" text="Review and approve donation requests" color="blue" />
        <QuickActionCard to="users" icon={<FaUsers />} title="User Management" text="Manage donors and recipients" color="green" />
        <QuickActionCard to="emergency" icon={<FaExclamationTriangle />} title="Emergency Cases" text="Handle urgent requests" color="red" />
        <QuickActionCard to="statistics" icon={<FaChartBar />} title="Statistics" text="View detailed analytics" color="purple" />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <FaClock className="text-gray-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {stats.recentActivity.length > 0 ? (
            stats.recentActivity.slice(0, 5).map((activity, index) => (
              <ActivityItem 
                key={activity._id || index}
                type={activity.type === 'blood' ? 'donation' : 'request'}
                message={`${activity.requesterId?.name || 'User'} requested ${activity.type === 'blood' ? activity.bloodType + ' blood' : activity.organ}`}
                time={new Date(activity.createdAt).toLocaleString()}
                status={activity.status?.toLowerCase() || 'pending'}
              />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No recent activity
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper functions
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

export default AdminOverview
