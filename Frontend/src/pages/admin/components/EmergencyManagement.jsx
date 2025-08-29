import React, { useState, useEffect } from 'react'
import { FaExclamationTriangle, FaTint, FaHandHoldingHeart, FaPhone, FaSearch, FaUser, FaCalendarAlt, FaEnvelope } from 'react-icons/fa'
import { useAuthStore } from '../../../store/auth'
import { toast } from 'react-toastify'

const EmergencyManagement = () => {
  const { token } = useAuthStore()
  const [emergencyRequests, setEmergencyRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchEmergencyRequests()
  }, [])

  const fetchEmergencyRequests = async () => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/admin/emergency', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setEmergencyRequests(data)
      } else {
        toast.error('Failed to fetch emergency requests')
      }
    } catch (error) {
      console.error('Failed to fetch emergency requests:', error)
      toast.error('Failed to fetch emergency requests')
    } finally {
      setLoading(false)
    }
  }

  const handleContactHospital = (request) => {
    // This would typically open a modal or redirect to contact form
    toast.info(`Contacting hospital for ${request.requesterId?.name || 'recipient'}`)
  }

  const handleFindDonor = (request) => {
    // This would typically search for available donors
    toast.info(`Searching for ${request.type === 'blood' ? request.bloodType + ' blood' : request.organ} donors`)
  }

  const filteredRequests = emergencyRequests.filter(request => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      request.requesterId?.name?.toLowerCase().includes(searchLower) ||
      request.requesterId?.email?.toLowerCase().includes(searchLower) ||
      (request.bloodType && request.bloodType.toLowerCase().includes(searchLower)) ||
      (request.organ && request.organ.toLowerCase().includes(searchLower))
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Emergency Management</h3>
          <p className="text-gray-600">Handle urgent donation requests</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search emergency requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-500">Loading emergency requests...</div>
        </div>
      ) : (
        <>
          {filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {filteredRequests.map((request) => (
                <div key={request._id} className="bg-white rounded-xl shadow-sm border p-4 md:p-6 border-red-200 bg-red-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <FaExclamationTriangle className="text-red-600 text-lg md:text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Emergency Request</h4>
                        <p className="text-sm text-gray-600">{new Date(request.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      request.urgency === 'emergency' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.urgency.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {request.type === 'blood' ? <FaTint className="text-red-600" /> : <FaHandHoldingHeart className="text-green-600" />}
                      <span className="font-medium">
                        {request.type === 'blood' ? `${request.bloodType} Blood` : request.organ}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <span><strong>Recipient:</strong> {request.requesterId?.name || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        <span><strong>Contact:</strong> {request.requesterId?.email || 'N/A'}</span>
                      </div>
                      {request.requesterId?.phone && (
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-gray-400" />
                          <span><strong>Phone:</strong> {request.requesterId.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />
                        <span><strong>Requested:</strong> {new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                      {request.description && (
                        <div className="mt-2 p-2 bg-white rounded text-xs">
                          <strong>Details:</strong> {request.description}
                        </div>
                      )}
                      {request.hospitalName && (
                        <div className="text-sm">
                          <strong>Hospital:</strong> {request.hospitalName}
                        </div>
                      )}
                      {request.doctorName && (
                        <div className="text-sm">
                          <strong>Doctor:</strong> {request.doctorName}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-4">
                      <button 
                        onClick={() => handleContactHospital(request)}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <FaPhone />
                        Contact Hospital
                      </button>
                      <button 
                        onClick={() => handleFindDonor(request)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <FaSearch />
                        Find Donor
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaExclamationTriangle className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No emergency requests at the moment</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default EmergencyManagement
