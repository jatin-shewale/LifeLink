import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  AdminOverview,
  RequestManagement,
  UserManagement,
  EmergencyManagement,
  Statistics
} from './components'

// Layout Component
const Layout = ({ children }) => (
  <div className="min-h-dvh bg-gray-50">
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">{children}</main>
  </div>
)

// Main Admin Dashboard Component
const AdminDashboard = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="requests" element={<RequestManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="emergency" element={<EmergencyManagement />} />
        <Route path="statistics" element={<Statistics />} />
      </Routes>
    </Layout>
  )
}

export default AdminDashboard


