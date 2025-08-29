import React, { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { FaSearch, FaInbox, FaMapMarkerAlt, FaFilter, FaHeart, FaTint, FaHandHoldingHeart, FaChartBar, FaUser, FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaClock, FaTimes, FaLightbulb, FaPhone, FaEnvelope, FaInfoCircle, FaBell, FaUserCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/auth'
import { toast } from 'react-toastify'
import AnimatedBg from '../../components/AnimatedBg'
import Profile from './Profile'
import CampusAwareness from './CampusAwareness'
import RecipientBlogs from './RecipientBlogs'

const RecipientHome = () => {
  const { token } = useAuthStore()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/recipient/requests', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setRequests(data)
        }
      } catch (error) {
        console.error('Failed to fetch requests:', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchRequests()
    }
  }, [token])

  return (
    <div className="relative min-h-dvh">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBg />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-indigo-50/50"></div>
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
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Recipient Portal
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find the support you need. Our network of donors and coordinators are here to help you through your journey.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <QuickCard to="search" icon={<FaSearch />} title="Search Donors" text="Find optimal donor matches by type and distance." />
          <QuickCard to="requests" icon={<FaInbox />} title="My Requests" text="Submit and track request status in one place." />
          <QuickCard to="awareness" icon={<FaLightbulb />} title="Campus Awareness" text="Educational programs and health resources." />
          <QuickCard to="blogs" icon={<FaHeart />} title="Health Blogs" text="Support resources and recovery stories." />
          <QuickCard to="map" icon={<FaMapMarkerAlt />} title="Nearby" text="Preview nearby donors and donation centers." />
          <QuickCard to="profile" icon={<FaUser />} title="Profile" text="Manage your recipient information and preferences." />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Requests */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl">
              <h3 className="font-semibold text-xl mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaInbox className="text-blue-600" />
                </div>
                Recent Requests
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading...</span>
                </div>
              ) : requests.length > 0 ? (
                <ul className="space-y-4">
                  {requests.slice(0, 5).map((request) => (
                    <motion.li 
                      key={request._id} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-100/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${request.type === 'blood' ? 'bg-red-100' : 'bg-green-100'}`}>
                          {request.type === 'blood' ? <FaTint className="text-red-600" /> : <FaHandHoldingHeart className="text-green-600" />}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">{request.type === 'blood' ? 'Blood' : 'Organ'} request</span>
                          {request.type === 'blood' && request.bloodType && (
                            <span className="text-gray-600 ml-2">({request.bloodType})</span>
                          )}
                          {request.type === 'organ' && request.organ && (
                            <span className="text-gray-600 ml-2">({request.organ})</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          request.status === 'approved' ? 'bg-green-100 text-green-700' :
                          request.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {request.status}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaInbox className="text-3xl text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-lg">No requests yet. Start your journey to find the support you need!</p>
                  <Link to="requests" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Submit Your First Request
                  </Link>
                </div>
              )}
            </div>

            {/* Support Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Health Tips */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-6 border border-white/20 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-xl shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FaHeart className="text-blue-600 text-xl" />
                  </div>
                  <h4 className="font-semibold text-xl text-gray-900">Health Tips</h4>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Maintain a healthy lifestyle</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Follow your doctor's recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Stay connected with support groups</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Keep your medical records updated</span>
                  </li>
                </ul>
              </motion.div>

              {/* Emergency Contacts */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 border border-white/20 rounded-2xl bg-gradient-to-r from-red-50/80 to-pink-50/80 backdrop-blur-xl shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <FaPhone className="text-red-600 text-xl" />
                  </div>
                  <h4 className="font-semibold text-xl text-gray-900">Emergency Contacts</h4>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Emergency Services</span>
                    <span className="font-semibold text-red-600">911</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>LifeLink Emergency</span>
                    <span className="font-semibold text-red-600">1-800-LIFELINK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Support Hotline</span>
                    <span className="font-semibold text-red-600">1-800-SUPPORT</span>
                  </div>
                </div>
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
                  <span className="text-gray-600">Total Requests</span>
                  <span className="font-semibold text-gray-900">{requests.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-yellow-600">{requests.filter(r => r.status === 'pending').length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Approved</span>
                  <span className="font-semibold text-green-600">{requests.filter(r => r.status === 'approved').length}</span>
                </div>
              </div>
            </div>

            {/* Support Resources */}
            <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaHeart className="text-green-600" />
                </div>
                Support Resources
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">24/7 Support Hotline</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Peer Support Groups</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Counseling Services</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600">Educational Resources</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const Search = () => {
  const [searchData, setSearchData] = useState({
    bloodType: 'O+',
    organ: 'Kidney',
    radius: 10,
    type: 'blood'
  })
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const { token } = useAuthStore()

  const onSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const params = new URLSearchParams()
      params.set('type', searchData.type)
      if (searchData.type === 'blood') params.set('bloodType', searchData.bloodType)
      if (searchData.type === 'organ') params.set('organ', searchData.organ)
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + `/recipient/search?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Search failed')
      const data = await res.json()
      setSearchResults(data)
    } catch (error) {
      toast.error('Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Search Donors</h3>
        <p className="text-gray-600">Find donors based on your specific needs and location</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <form onSubmit={onSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Type</label>
              <div className="flex gap-3">
                <label className="inline-flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="type" 
                    value="blood" 
                    checked={searchData.type === 'blood'} 
                    onChange={handleChange}
                  />
                  <span>Blood</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="type" 
                    value="organ" 
                    checked={searchData.type === 'organ'} 
                    onChange={handleChange}
                  />
                  <span>Organ</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Radius (km)</label>
              <input 
                type="number" 
                name="radius"
                value={searchData.radius} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                min="1"
                max="100"
              />
            </div>
          </div>

          {searchData.type === 'blood' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
              <select 
                name="bloodType"
                value={searchData.bloodType} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              >
                {['O+','O-','A+','A-','B+','B-','AB+','AB-'].map(t=> <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organ Type</label>
              <select 
                name="organ"
                value={searchData.organ} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              >
                {['Kidney','Liver','Heart','Lung','Pancreas','Cornea'].map(o=> <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          )}

          {/* Name search removed: availability-only search */}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-rose-700 focus:ring-4 focus:ring-rose-200 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search Donors'}
          </button>
        </form>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h4 className="font-semibold text-lg mb-4">Search Results</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((result, idx) => (
              <div key={result._id || idx} className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  {(searchData.type === 'blood') ? <FaTint className="text-red-600" /> : <FaHandHoldingHeart className="text-green-600" />}
                  <span className="font-semibold">
                    {searchData.type === 'blood' ? (result.bloodType || 'Blood Donor') : (result.organPledge?.join(', ') || 'Organ Donor')}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Name: {result.name}</div>
                  <div>Email: {result.email}</div>
                  {searchData.type === 'blood' && <div>Blood Type: {result.bloodType || 'N/A'}</div>}
                  {searchData.type === 'organ' && <div>Organs: {result.organPledge?.join(', ') || 'N/A'}</div>}
                  <div>Available: {searchData.type === 'blood' ? (result.availability?.bloodAvailable ? 'Yes' : 'No') : (Array.isArray(result.availability?.organsAvailable) && result.availability.organsAvailable.length ? 'Yes' : 'No')}</div>
                </div>
                <button className="mt-3 w-full bg-rose-600 text-white py-2 px-4 rounded text-sm hover:bg-rose-700 transition-colors">
                  Request Match
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

const Requests = () => {
  const [showForm, setShowForm] = useState(false)
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">My Requests</h3>
          <p className="text-gray-600">Track the status of your donation requests</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors"
        >
          {showForm ? 'Cancel' : 'New Request'}
        </button>
      </div>

      {showForm && <RequestForm onClose={() => setShowForm(false)} />}
      
      <RequestsList />
    </div>
  )
}

const RequestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    type: 'blood',
    bloodType: 'O+',
    organ: 'Kidney',
    urgency: 'normal',
    description: '',
    radiusKm: 10,
    contactPhone: '',
    hospitalName: '',
    doctorName: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const { token } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/recipient/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: formData.type,
          bloodType: formData.type === 'blood' ? formData.bloodType : undefined,
          organ: formData.type === 'organ' ? formData.organ : undefined,
          radiusKm: formData.radiusKm,
          urgency: formData.urgency,
          description: formData.description,
          contactPhone: formData.contactPhone,
          hospitalName: formData.hospitalName,
          doctorName: formData.doctorName
        })
      })
      if (!res.ok) throw new Error('Failed')
      toast.success('Request submitted successfully! Our coordinators will contact you soon.')
      onClose()
      window.location.reload() // Refresh to show new request
    } catch (err) {
      toast.error('Submit failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const urgencyColors = {
    low: 'bg-green-100 text-green-800',
    normal: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    emergency: 'bg-red-100 text-red-800'
  }

  return (
    <div className="relative min-h-dvh">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBg />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-indigo-50/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center py-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl px-4"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <FaHandHoldingHeart className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Submit Request</h2>
              <p className="text-gray-600 mt-1 text-sm">Tell us about your donation needs. We'll help you find the right match.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Request Type Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaHandHoldingHeart className="text-blue-600 text-xs" />
                  </div>
                  Request Type
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className={`relative cursor-pointer group ${formData.type === 'blood' ? 'ring-2 ring-red-500' : 'ring-1 ring-gray-200'}`}>
                    <input 
                      type="radio" 
                      name="type" 
                      value="blood" 
                      checked={formData.type === 'blood'} 
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${formData.type === 'blood' ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-25'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.type === 'blood' ? 'bg-red-100' : 'bg-gray-100'}`}>
                          <FaTint className={`text-lg ${formData.type === 'blood' ? 'text-red-600' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-base text-gray-900">Blood Donation</h4>
                          <p className="text-xs text-gray-600">Request blood transfusion</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className={`relative cursor-pointer group ${formData.type === 'organ' ? 'ring-2 ring-green-500' : 'ring-1 ring-gray-200'}`}>
                    <input 
                      type="radio" 
                      name="type" 
                      value="organ" 
                      checked={formData.type === 'organ'} 
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${formData.type === 'organ' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-25'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.type === 'organ' ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <FaHeart className={`text-lg ${formData.type === 'organ' ? 'text-green-600' : 'text-gray-500'}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-base text-gray-900">Organ Donation</h4>
                          <p className="text-xs text-gray-600">Request organ transplant</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Urgency Level */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaExclamationTriangle className="text-orange-600 text-xs" />
                  </div>
                  Urgency Level
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'low', label: 'Low', description: 'Non-urgent' },
                    { value: 'normal', label: 'Normal', description: 'Standard timeline' },
                    { value: 'high', label: 'High', description: 'Urgent need' },
                    { value: 'emergency', label: 'Emergency', description: 'Immediate need' }
                  ].map((level) => (
                    <label key={level.value} className="relative cursor-pointer">
                      <input 
                        type="radio" 
                        name="urgency" 
                        value={level.value} 
                        checked={formData.urgency === level.value} 
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-3 rounded-lg border-2 transition-all duration-300 text-center ${formData.urgency === level.value ? `border-orange-500 bg-orange-50 ${urgencyColors[level.value]}` : 'border-gray-200 bg-white hover:border-orange-300'}`}>
                        <div className="font-semibold text-base">{level.label}</div>
                        <div className="text-xs opacity-75">{level.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Donation Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaInfoCircle className="text-purple-600 text-xs" />
                  </div>
                  Donation Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.type === 'blood' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Required Blood Type</label>
                      <select
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                      >
                        {['O+','O-','A+','A-','B+','B-','AB+','AB-'].map(t=> <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Required Organ</label>
                      <select
                        name="organ"
                        value={formData.organ}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                      >
                        {['Kidney','Liver','Heart','Lung','Pancreas','Cornea'].map(o=> <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Search Radius (km)</label>
                    <div className="relative">
                      <input
                        type="range"
                        name="radiusKm"
                        value={formData.radiusKm}
                        onChange={handleChange}
                        min="1"
                        max="100"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(formData.radiusKm / 100) * 100}%, #e5e7eb ${(formData.radiusKm / 100) * 100}%, #e5e7eb 100%)`
                        }}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1km</span>
                        <span className="font-semibold text-blue-600">{formData.radiusKm}km</span>
                        <span>100km</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaUser className="text-green-600 text-xs" />
                  </div>
                  Medical Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Hospital Name</label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter hospital name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Doctor Name</label>
                    <input
                      type="text"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter doctor's name"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                      placeholder="Enter contact phone number"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Details</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                      placeholder="Please provide any additional information about your request, medical history, or special requirements..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const RequestsList = () => {
  const { token } = useAuthStore()
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/recipient/requests', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error('Failed')
        setItems(await res.json())
      } catch (e) {
        toast.error('Failed to load requests')
      } finally {
        setLoading(false)
      }
    }
    if (token) run()
  }, [token])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">My Requests</h3>
        <p className="text-gray-600">Track the status of your donation requests</p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-500">Loading requests...</div>
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item._id} className="p-6 border rounded-xl bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'blood' ? 'bg-red-100' : 'bg-green-100'}`}>
                    {item.type === 'blood' ? <FaTint className="text-red-600" /> : <FaHandHoldingHeart className="text-green-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.type === 'blood' ? 'Blood' : 'Organ'} Request
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.type === 'blood' ? item.bloodType : item.organ}
                    </p>
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div>Created: {new Date(item.createdAt).toLocaleDateString()}</div>
                {item.radiusKm && <div>Search radius: {item.radiusKm} km</div>}
              </div>

              <div className="mt-4 pt-4 border-t">
                <button className="w-full bg-rose-600 text-white py-2 px-4 rounded text-sm hover:bg-rose-700 transition-colors">
                  Contact Coordinator
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FaInbox className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No requests yet. Start by searching for donors!</p>
        </div>
      )}
    </div>
  )
}

const Map = () => (
  <div className="space-y-6">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Nearby Donors</h3>
      <p className="text-gray-600">View donors and donation centers in your area</p>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
      <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-4" />
      <h4 className="text-lg font-semibold text-gray-900 mb-2">Map Coming Soon</h4>
      <p className="text-gray-600">Interactive map showing nearby donors and donation centers will be available here.</p>
    </div>
  </div>
)

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'PENDING': { color: 'bg-yellow-100 text-yellow-800', icon: <FaClock className="text-xs" /> },
    'VERIFIED': { color: 'bg-blue-100 text-blue-800', icon: <FaCheckCircle className="text-xs" /> },
    'APPROVED': { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="text-xs" /> },
    'MATCHED': { color: 'bg-purple-100 text-purple-800', icon: <FaHeart className="text-xs" /> },
    'COMPLETED': { color: 'bg-gray-100 text-gray-800', icon: <FaCheckCircle className="text-xs" /> },
    'REJECTED': { color: 'bg-red-100 text-red-800', icon: <FaTimes className="text-xs" /> }
  }

  const config = statusConfig[status] || statusConfig['PENDING']

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {status}
    </span>
  )
}

const RecipientDashboard = () => {
  return (
    <div className="min-h-dvh px-4 sm:px-6 lg:px-8 pb-8">
      <Routes>
        <Route path="/" element={<RecipientHome />} />
        <Route path="search" element={<Search />} />
        <Route path="requests" element={<Requests />} />
        <Route path="map" element={<Map />} />
        <Route path="profile" element={<Profile />} />
        <Route path="awareness" element={<CampusAwareness />} />
        <Route path="blogs" element={<RecipientBlogs />} />
      </Routes>
    </div>
  )
}

const QuickCard = ({ to, icon, title, text }) => (
  <Link to={to} className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 block group">
    <div className="text-blue-600 text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <div className="font-semibold text-lg text-gray-900 mb-2">{title}</div>
    <div className="text-sm text-gray-600 leading-relaxed">{text}</div>
  </Link>
)

export default RecipientDashboard


