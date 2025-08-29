import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaSignInAlt, FaHeartbeat, FaChevronDown } from 'react-icons/fa'
import { useAuthStore } from '../../store/auth'
import { toast } from 'react-toastify'
import AnimatedBg from '../../components/AnimatedBg'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('donor')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await login({ email, password })
      const user = useAuthStore.getState().user
      
      // Check if the logged-in user's role matches the selected role
      if (user?.role !== role) {
        toast.error(`Access denied! You are registered as a ${user?.role}, not a ${role}. Please select the correct role.`)
        setIsLoading(false)
        return
      }
      
      toast.success(`Welcome back, ${user?.name}!`)
      
      // Navigate based on role
      if (user?.role === 'admin') {
        navigate('/admin')
      } else if (user?.role === 'recipient') {
        navigate('/recipient')
      } else {
        navigate('/donor')
      }
    } catch (e) {
      toast.error('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const roles = [
    { value: 'donor', label: 'Donor', icon: '🩸' },
    { value: 'recipient', label: 'Recipient', icon: '🏥' },
    { value: 'admin', label: 'Admin', icon: '⚙️' }
  ]

  const selectedRole = roles.find(r => r.value === role)

  return (
    <div className="min-h-dvh flex items-center justify-center relative overflow-hidden">
      <AnimatedBg />
      <div className="relative z-10 w-full max-w-md px-4">
        <form onSubmit={onSubmit} className="w-full bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/20">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-rose-600 font-bold text-2xl mb-2">
              <FaHeartbeat className="text-3xl" />
              <span>LifeLink</span>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Welcome Back</h1>
            <p className="text-gray-600 text-sm mt-1">Use any email/password for now.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  type="email" 
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-[1.5rem] outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  placeholder="you@example.com" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                  type="password" 
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-[1.5rem] outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  placeholder="••••••••" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-[1.5rem] outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/80 backdrop-blur-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{selectedRole.icon}</span>
                    <span className="font-medium">{selectedRole.label}</span>
                  </div>
                  <FaChevronDown className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-[1rem] shadow-lg z-10 overflow-hidden">
                    {roles.map((roleOption) => (
                      <button
                        key={roleOption.value}
                        type="button"
                        onClick={() => {
                          setRole(roleOption.value)
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-200 ${
                          role === roleOption.value ? 'bg-rose-50 text-rose-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{roleOption.icon}</span>
                        <span className="font-medium">{roleOption.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-rose-600 to-purple-600 text-white py-3 rounded-[1.5rem] hover:from-rose-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  <span>Sign in</span>
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                No account? <Link to="/register" className="text-rose-600 font-semibold hover:text-rose-700 transition-colors">Register</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login


