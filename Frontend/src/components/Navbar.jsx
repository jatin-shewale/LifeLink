import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeartbeat, FaBars, FaTimes, FaBell, FaUserCircle, FaSignOutAlt, FaCog } from 'react-icons/fa'
import { useAuthStore } from '../store/auth'

const Navbar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuthStore()

  const onLogout = () => {
    logout()
    navigate('/')
  }

  const userMenuItems = useMemo(() => {
    if (!user) return []
    
    switch (user.role) {
      case 'donor':
        return [
          { to: '/donor', label: 'Dashboard', icon: <FaUserCircle /> },
          { to: '/donor/donate', label: 'Donate', icon: <FaHeartbeat /> },
          { to: '/donor/profile', label: 'Profile', icon: <FaCog /> }
        ]
      case 'recipient':
        return [
          { to: '/recipient', label: 'Dashboard', icon: <FaUserCircle /> },
          { to: '/recipient/requests', label: 'Requests', icon: <FaBell /> },
          { to: '/recipient/profile', label: 'Profile', icon: <FaCog /> }
        ]
      case 'admin':
        return [
          { to: '/admin', label: 'Dashboard', icon: <FaUserCircle /> },
          { to: '/admin', label: 'Manage', icon: <FaCog /> }
        ]
      default:
        return []
    }
  }, [user])

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-rose-600 font-bold text-xl sm:text-2xl hover:text-rose-700 transition-colors">
          <div className="relative">
            <FaHeartbeat className="text-2xl sm:text-3xl" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          </div>
          <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">LifeLink</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="sm:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors" 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle menu"
        >
          {open ? <FaTimes className="text-gray-600" /> : <FaBars className="text-gray-600" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {!user && (
            <>
              <Link to="/donor" className="hover:text-rose-600 transition-colors font-medium">Donor</Link>
              <Link to="/recipient" className="hover:text-rose-600 transition-colors font-medium">Recipient</Link>
              <Link to="/admin" className="hover:text-rose-600 transition-colors font-medium">Admin</Link>
            </>
          )}
          
          {user ? (
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Link 
                to={user.role === 'donor' ? '/donor' : user.role === 'recipient' ? '/recipient' : '/admin'} 
                aria-label="Notifications" 
                className="relative p-3 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all duration-200"
              >
                <FaBell className="text-lg" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
              </Link>

              {/* User Menu */}
              <div className="relative group">
                <button className="inline-flex items-center gap-3 hover:text-rose-600 transition-colors font-medium p-2 rounded-2xl hover:bg-rose-50">
                  <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden lg:block">{user.name}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-3">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.to}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={onLogout} 
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 rounded-xl border border-gray-300 hover:border-rose-300 hover:text-rose-600 transition-all duration-200 font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white hover:from-rose-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            {!user && (
              <>
                <Link to="/donor" onClick={() => setOpen(false)} className="py-2 px-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium">Donor</Link>
                <Link to="/recipient" onClick={() => setOpen(false)} className="py-2 px-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium">Recipient</Link>
                <Link to="/admin" onClick={() => setOpen(false)} className="py-2 px-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium">Admin</Link>
              </>
            )}
            
            {user && (
              <>
                <div className="px-3 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                {userMenuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors font-medium"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-200 my-2"></div>
                <button 
                  onClick={() => { setOpen(false); onLogout() }} 
                  className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-left"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            )}
            
            {!user && (
              <div className="flex gap-2 pt-2 border-t border-gray-200">
                <Link 
                  to="/login" 
                  onClick={() => setOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-300 hover:border-rose-300 hover:text-rose-600 transition-all duration-200 text-center font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={() => setOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white hover:from-rose-700 hover:to-purple-700 transition-all duration-200 text-center font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar


