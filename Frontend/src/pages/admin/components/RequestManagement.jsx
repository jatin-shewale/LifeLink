import React, { useState, useEffect } from 'react'
import { FaTint, FaHandHoldingHeart, FaCheckCircle, FaTimes, FaBell, FaSearch, FaFilter, FaInbox, FaExclamationTriangle } from 'react-icons/fa'
import { useAuthStore } from '../../../store/auth'
import { toast } from 'react-toastify'
import RequestCard from './RequestCard'

const RequestManagement = () => {
  const { token } = useAuthStore()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/admin/requests', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setRequests(data)
      } else {
        toast.error('Failed to fetch requests')
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
      toast.error('Failed to fetch requests')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (requestId) => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + `/admin/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: 'APPROVED' })
      })
      
      if (res.ok) {
        toast.success('Request approved successfully! Recipient will be notified.')
        fetchRequests()
      } else {
        const errorData = await res.json()
        if (errorData.error === 'Insufficient inventory') {
          toast.error(errorData.message || 'Cannot approve - Item is out of stock')
        } else {
          toast.error('Failed to approve request')
        }
      }
    } catch (error) {
      toast.error('Failed to approve request')
    }
  }

  const handleReject = async (requestId) => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + `/admin/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: 'REJECTED' })
      })
      if (res.ok) {
        toast.success('Request rejected. Recipient will be notified.')
        fetchRequests()
      } else {
        toast.error('Failed to reject request')
      }
    } catch (error) {
      toast.error('Failed to reject request')
    }
  }

  const notifyUnavailable = async (requestId) => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + `/admin/requests/${requestId}/notify-unavailable`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        toast.info('Recipient notified: no availability at the moment')
      } else {
        toast.error('Failed to notify recipient')
      }
    } catch (error) {
      toast.error('Failed to notify recipient')
    }
  }

  const filteredRequests = requests.filter(request => {
    // Filter by status/urgency
    if (filter === 'all') return true
    if (filter === 'emergency') return request.urgency === 'emergency'
    if (filter === 'pending') return request.status === 'PENDING'
    if (filter === 'approved') return request.status === 'APPROVED'
    if (filter === 'rejected') return request.status === 'REJECTED'
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        request.requesterId?.name?.toLowerCase().includes(searchLower) ||
        request.requesterId?.email?.toLowerCase().includes(searchLower) ||
        (request.bloodType && request.bloodType.toLowerCase().includes(searchLower)) ||
        (request.organ && request.organ.toLowerCase().includes(searchLower))
      )
    }
    
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Request Management</h3>
          <p className="text-gray-600">Review and manage donation requests with inventory checks</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="emergency">Emergency</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Inventory Status Legend */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Inventory-Based Approval System</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-600" />
            <span className="text-green-800">Available in Stock - Can Approve</span>
          </div>
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="text-red-600" />
            <span className="text-red-800">Out of Stock - Cannot Approve</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTimes className="text-gray-600" />
            <span className="text-gray-800">Reject or Notify Unavailable</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-500">Loading requests...</div>
        </div>
      ) : (
        <>
          {filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredRequests.map((request) => (
                <RequestCard 
                  key={request._id} 
                  request={request} 
                  onApprove={() => handleApprove(request._id)}
                  onReject={() => handleReject(request._id)}
                  onNotifyUnavailable={() => notifyUnavailable(request._id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaInbox className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No requests found</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default RequestManagement
