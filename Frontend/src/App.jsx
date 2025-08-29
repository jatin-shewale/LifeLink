import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Protected from './components/Protected.jsx'

const Landing = React.lazy(() => import('./pages/Landing.jsx'))
const Login = React.lazy(() => import('./pages/auth/Login.jsx'))
const Register = React.lazy(() => import('./pages/auth/Register.jsx'))
const DonorDashboard = React.lazy(() => import('./pages/donor/Dashboard.jsx'))
const RecipientDashboard = React.lazy(() => import('./pages/recipient/Dashboard.jsx'))
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard.jsx'))

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <React.Suspense fallback={
        <div className="min-h-dvh flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Donor Routes */}
          <Route element={<Protected roles={['donor']} />}>
            <Route path="/donor/*" element={<DonorDashboard />} />
          </Route>

          {/* Protected Recipient Routes */}
          <Route element={<Protected roles={['recipient']} />}>
            <Route path="/recipient/*" element={<RecipientDashboard />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<Protected roles={['admin']} />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>

          {/* Redirect any unmatched routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App