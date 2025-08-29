import React, { useState, useEffect } from 'react'
import { FaUser, FaPhone, FaHeartbeat, FaTint, FaHandHoldingHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/auth'
import { toast } from 'react-toastify'
import AnimatedBg from '../../components/AnimatedBg'

const Profile = () => {
  const { user, token } = useAuthStore()
  const [formData, setFormData] = useState({
    address: '',
    bloodType: 'O+',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    lastDonation: '',
    preferredDonationType: 'blood'
  })

  const [availability, setAvailability] = useState({ bloodAvailable: false, organsAvailable: [] })
  const [savingAvail, setSavingAvail] = useState(false)

  useEffect(() => {
    if (user?.availability) {
      setAvailability({
        bloodAvailable: !!user.availability.bloodAvailable,
        organsAvailable: Array.isArray(user.availability.organsAvailable) ? user.availability.organsAvailable : []
      })
    }
  }, [user])

  const toggleOrgan = (organ) => {
    setAvailability(prev => {
      const exists = prev.organsAvailable.includes(organ)
      const next = exists ? prev.organsAvailable.filter(o => o !== organ) : [...prev.organsAvailable, organ]
      return { ...prev, organsAvailable: next }
    })
  }

  const saveAvailability = async () => {
    setSavingAvail(true)
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/donor/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(availability)
      })
      if (!res.ok) throw new Error('Failed')
      toast.success('Availability updated')
    } catch (e) {
      toast.error('Failed to update availability')
    } finally {
      setSavingAvail(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Profile updated successfully!')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="relative min-h-dvh">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBg />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white/30 to-purple-50/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex justify-center py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl px-4"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaUser className="text-4xl text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Donor Profile</h2>
              <p className="text-gray-600 mt-2">Manage your donor information and preferences</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-rose-100 rounded-lg flex items-center justify-center">
                    <FaUser className="text-rose-600 text-xs" />
                  </div>
                  Account Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user?.name || 'Not available'}
                      disabled
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user?.email || 'Not available'}
                      disabled
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Essential Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaUser className="text-blue-600 text-xs" />
                  </div>
                  Essential Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                    >
                      {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Donation Type</label>
                    <select
                      name="preferredDonationType"
                      value={formData.preferredDonationType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                    >
                      <option value="blood">Blood</option>
                      <option value="organ">Organ</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      placeholder="Enter your full address"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-red-600 text-xs" />
                  </div>
                  Emergency Contact
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                      placeholder="Emergency contact phone"
                    />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaHeartbeat className="text-green-600 text-xs" />
                  </div>
                  Availability
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center gap-2 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={availability.bloodAvailable}
                      onChange={(e) => setAvailability(prev => ({ ...prev, bloodAvailable: e.target.checked }))}
                    />
                    <span className="flex items-center gap-2"><FaTint className="text-red-600" /> Available for blood donation</span>
                  </label>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium mb-2 flex items-center gap-2"><FaHandHoldingHeart className="text-green-600" /> Organs available</div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      {['Kidney','Liver','Heart','Lung','Pancreas','Cornea'].map(org => (
                        <button type="button" key={org} onClick={() => toggleOrgan(org)} className={`px-3 py-1 rounded-full border ${availability.organsAvailable.includes(org) ? 'bg-green-100 border-green-300 text-green-700' : 'bg-white border-gray-300 text-gray-700'}`}>
                          {org}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <button type="button" disabled={savingAvail} onClick={saveAvailability} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50">
                    {savingAvail ? 'Saving...' : 'Save Availability'}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-rose-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
