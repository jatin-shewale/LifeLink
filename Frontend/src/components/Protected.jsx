import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

const Protected = ({ roles }) => {
  const { user, token } = useAuthStore()

  if (!token) return <Navigate to="/login" replace />

  if (token && !user) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (roles && !([].concat(roles)).includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default Protected