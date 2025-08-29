import React, { useState } from 'react'
import { FaUser, FaHandHoldingHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/auth'
import { toast } from 'react-toastify'
import AnimatedBg from '../../components/AnimatedBg'

const DonateForm = () => {
  const [donationType, setDonationType] = useState('blood')
  const [bloodType, setBloodType] = useState('O+')
  const [organ, setOrgan] = useState('Kidney')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { token } = useAuthStore()

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/donor/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ type: donationType, bloodType, organ, date, address, description })
      })
      if (!res.ok) throw new Error('Failed')
      toast.success('Donation submitted successfully! Coordinators will contact you soon.')
      
      // Reset form
      setName('')
      setAddress('')
      setPhone('')
      setDescription('')
      setDate(new Date().toISOString().split('T')[0])
      
      // Refresh the donations list
      window.location.reload()
    } catch (err) {
      toast.error('Submit failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaHandHoldingHeart className="text-3xl text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Donate Now</h2>
              <p className="text-gray-600 mt-2">Submit your donation details. Our coordinators will contact you to arrange everything.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-rose-100 rounded-lg flex items-center justify-center">
                    <FaUser className="text-rose-600 text-sm" />
                  </div>
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input 
                      value={name} 
                      onChange={(e)=>setName(e.target.value)} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300" 
                      placeholder="Your full name" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input 
                      value={phone} 
                      onChange={(e)=>setPhone(e.target.value)} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300" 
                      placeholder="Contact number" 
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <input 
                      value={address} 
                      onChange={(e)=>setAddress(e.target.value)} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300" 
                      placeholder="Street, City, State, ZIP" 
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Donation Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaHandHoldingHeart className="text-blue-600 text-sm" />
                  </div>
                  Donation Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                    <input 
                      type="date" 
                      value={date} 
                      onChange={(e)=>setDate(e.target.value)} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Donation Type</label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="dtype" 
                          checked={donationType==='blood'} 
                          onChange={()=>setDonationType('blood')}
                          className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                        />
                        <span className="text-gray-700">Blood</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="dtype" 
                          checked={donationType==='organ'} 
                          onChange={()=>setDonationType('organ')}
                          className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                        />
                        <span className="text-gray-700">Organ</span>
                      </label>
                    </div>
                  </div>
                  
                  {donationType === 'blood' ? (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
                      <select 
                        value={bloodType} 
                        onChange={(e)=>setBloodType(e.target.value)} 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                        required
                      >
                        {['O+','O-','A+','A-','B+','B-','AB+','AB-'].map(t=> <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Organ Type</label>
                      <select 
                        value={organ} 
                        onChange={(e)=>setOrgan(e.target.value)} 
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300"
                        required
                      >
                        {['Kidney','Liver','Heart','Lung','Pancreas','Cornea'].map(o=> <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  )}
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information</label>
                    <textarea 
                      value={description} 
                      onChange={(e)=>setDescription(e.target.value)} 
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-300" 
                      placeholder="Any special requirements or additional information..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-rose-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-rose-700 hover:to-purple-700 focus:ring-4 focus:ring-rose-200 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Donation Request'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DonateForm
