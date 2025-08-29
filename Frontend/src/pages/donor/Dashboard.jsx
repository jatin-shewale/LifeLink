import React, { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { FaUser, FaCalendarAlt, FaTint, FaHandsHelping, FaMapMarkerAlt, FaBell, FaHandHoldingHeart, FaChartBar, FaFirstAid, FaGlassWhiskey, FaBed, FaUtensils, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/auth'
import { toast } from 'react-toastify'
import AnimatedBg from '../../components/AnimatedBg'
import Profile from './Profile'
import DonateForm from './DonateForm'
import FirstAidAwareness from './FirstAidAwareness'
import Blogs from './Blogs'

const DonorHome = () => {
  const { token } = useAuthStore()
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/donor/donations', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (res.ok) {
          const data = await res.json()
          setDonations(data)
        } else if (res.status === 401) {
          console.error('Authentication failed - token might be invalid')
        }
      } catch (error) {
        console.error('Failed to fetch donations:', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchDonations()
    } else {
      setLoading(false)
    }
  }, [token])

  return (
    <div className="relative min-h-dvh">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBg />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white/30 to-purple-50/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 pt-8"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Donor Portal
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your generosity saves lives. Every donation, whether blood or organ, creates a ripple effect of hope and healing.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <QuickCard to="profile" icon={<FaUser />} title="Profile" text="Manage blood profile and organ pledges." />
          <QuickCard to="donate" icon={<FaHandHoldingHeart />} title="Donate now" text="Submit a donation intent with details." />
          <QuickCard to="awareness" icon={<FaFirstAid />} title="First Aid & Awareness" text="Learn first aid techniques and health tips." />
          <QuickCard to="blogs" icon={<FaLightbulb />} title="Health Blogs" text="Read latest health and donation insights." />
          <QuickCard to="schedule" icon={<FaCalendarAlt />} title="Schedule" text="Update your availability calendar." />
          <QuickCard to="nearby" icon={<FaMapMarkerAlt />} title="Nearby" text="Check requests in your area." />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                  <FaCalendarAlt className="text-rose-600" />
                </div>
                Recent Activity
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
                  <span className="ml-3 text-gray-600">Loading...</span>
                </div>
              ) : donations.length > 0 ? (
                <ul className="space-y-4">
                  {donations.slice(0, 5).map((donation) => (
                    <motion.li 
                      key={donation._id} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50/80 to-pink-50/80 rounded-xl border border-rose-100/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${donation.type === 'blood' ? 'bg-red-100' : 'bg-green-100'}`}>
                          {donation.type === 'blood' ? <FaTint className="text-red-600" /> : <FaHandHoldingHeart className="text-green-600" />}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">{donation.type === 'blood' ? 'Blood' : 'Organ'} donation</span>
                          {donation.type === 'blood' && donation.bloodType && (
                            <span className="text-gray-600 ml-2">({donation.bloodType})</span>
                          )}
                          {donation.type === 'organ' && donation.organ && (
                            <span className="text-gray-600 ml-2">({donation.organ})</span>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm font-medium bg-white/50 px-3 py-1 rounded-full">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaHandHoldingHeart className="text-3xl text-rose-600" />
                  </div>
                  <p className="text-gray-600 text-lg">No donations yet. Start your journey of saving lives today!</p>
                  <Link to="donate" className="inline-block mt-4 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
                    Make Your First Donation
                  </Link>
                </div>
              )}
            </div>

            {/* Donation Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Donation Tips */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 border border-white/20 rounded-2xl bg-gradient-to-br from-red-50/80 to-pink-50/80 backdrop-blur-xl shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <FaTint className="text-red-600 text-xl" />
                  </div>
                  <h4 className="font-semibold text-xl text-gray-900">Blood Donation Tips</h4>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Eat a healthy meal 3 hours before donation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Stay hydrated - drink plenty of water</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Get adequate sleep the night before</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Avoid alcohol 24 hours before donation</span>
                  </li>
                </ul>
              </motion.div>

              {/* Organ Donation Tips */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 border border-white/20 rounded-2xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-xl shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FaHandHoldingHeart className="text-green-600 text-xl" />
                  </div>
                  <h4 className="font-semibold text-xl text-gray-900">Organ Donation Tips</h4>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Register as an organ donor</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Discuss your decision with family</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Keep your donor card updated</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Stay healthy and maintain good habits</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaChartBar className="text-blue-600" />
                </div>
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Donations</span>
                  <span className="font-semibold text-gray-900">{donations.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Blood Donations</span>
                  <span className="font-semibold text-red-600">{donations.filter(d => d.type === 'blood').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Organ Pledges</span>
                  <span className="font-semibold text-green-600">{donations.filter(d => d.type === 'organ').length}</span>
                </div>
              </div>
            </div>

            {/* Health Reminders */}
            <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaBell className="text-green-600" />
                </div>
                Health Reminders
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Drink 8 glasses of water daily</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Get 7-9 hours of sleep</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Exercise for 30 minutes</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Eat a balanced diet</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const DonorDashboard = () => {
  return (
    <div className="min-h-dvh px-4 sm:px-6 lg:px-8 pb-8">
      <Routes>
        <Route path="/" element={<DonorHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="donate" element={<DonateForm />} />
        <Route path="awareness" element={<FirstAidAwareness />} />
        <Route path="blogs" element={<Blogs />} />
      </Routes>
    </div>
  )
}

const QuickCard = ({ to, icon, title, text }) => (
  <Link to={to} className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 block group">
    <div className="text-rose-600 text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <div className="font-semibold text-lg text-gray-900 mb-2">{title}</div>
    <div className="text-sm text-gray-600 leading-relaxed">{text}</div>
  </Link>
)

export default DonorDashboard
