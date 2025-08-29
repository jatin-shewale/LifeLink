import React, { useState, useEffect } from 'react'
import { FaTint, FaHandHoldingHeart, FaUser, FaCalendarAlt, FaPhone, FaEnvelope, FaCheckCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa'
import { useAuthStore } from '../../../store/auth'
import { toast } from 'react-toastify'

const RequestCard = ({ request, onApprove, onReject, onNotifyUnavailable }) => {
  const { token } = useAuthStore()
  const [inventoryStatus, setInventoryStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (request.status === 'PENDING') {
      checkInventory()
    }
  }, [request._id])

  const checkInventory = async () => {
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + `/admin/requests/${request._id}/inventory-check`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setInventoryStatus(data)
      }
    } catch (error) {
      console.error('Failed to check inventory:', error)
    }
  }

  const handleApprove = async () => {
    if (!inventoryStatus?.available) {
      toast.error(`${request.type === 'blood' ? request.bloodType + ' blood' : request.organ} is out of stock!`)
      return
    }
    
    setLoading(true)
    try {
      await onApprove()
    } finally {
      setLoading(false)
    }
  }

  const getUrgencyColor = () => {
    switch (request.urgency) {
      case 'emergency': return 'border-red-200 bg-red-50'
      case 'high': return 'border-orange-200 bg-orange-50'
      default: return 'border-gray-200 bg-white'
    }
  }

  const getStatusColor = () => {
    switch (request.status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getInventoryStatusColor = () => {
    if (!inventoryStatus) return 'bg-gray-100 text-gray-800'
    return inventoryStatus.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  return (
    <div className={`p-4 md:p-6 border rounded-xl shadow-sm ${getUrgencyColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
            request.type === 'blood' ? 'bg-red-100' : 'bg-green-100'
          }`}>
            {request.type === 'blood' ? <FaTint className="text-red-600" /> : <FaHandHoldingHeart className="text-green-600" />}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-gray-900 text-sm md:text-base">
              {request.type === 'blood' ? 'Blood' : 'Organ'} Request
            </h4>
            <p className="text-xs md:text-sm text-gray-600">
              {request.type === 'blood' ? request.bloodType : request.organ}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${getStatusColor()}`}>
            {request.status}
          </span>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
            request.urgency === 'emergency' ? 'bg-red-100 text-red-800' :
            request.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {request.urgency}
          </span>
        </div>
      </div>

      {/* Inventory Status */}
      {request.status === 'PENDING' && inventoryStatus && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {inventoryStatus.available ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <FaExclamationTriangle className="text-red-600" />
              )}
              <span className="text-sm font-medium">Inventory Status:</span>
            </div>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInventoryStatusColor()}`}>
              {inventoryStatus.available ? `Available (${inventoryStatus.count})` : 'Out of Stock'}
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {inventoryStatus.type === 'blood' ? `${inventoryStatus.item} Blood` : inventoryStatus.item}
          </div>
        </div>
      )}

      {/* Requester Info */}
      <div className="space-y-2 text-xs md:text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <FaUser className="text-gray-400" />
          <span className="font-medium">{request.requesterId?.name || 'Unknown'}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-gray-400" />
          <span>{request.requesterId?.email || 'N/A'}</span>
        </div>
        {request.requesterId?.phone && (
          <div className="flex items-center gap-2">
            <FaPhone className="text-gray-400" />
            <span>{request.requesterId.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" />
          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
        </div>
        {request.description && (
          <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
            <strong>Details:</strong> {request.description}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {request.status === 'PENDING' && (
        <div className="space-y-2">
          <button
            onClick={handleApprove}
            disabled={!inventoryStatus?.available || loading}
            className={`w-full py-2 px-3 md:px-4 rounded text-xs md:text-sm transition-colors ${
              inventoryStatus?.available 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Processing...' : 'Approve Request'}
          </button>
          
          {!inventoryStatus?.available && (
            <div className="text-xs text-red-600 text-center">
              Cannot approve - Item out of stock
            </div>
          )}
          
          <div className="flex gap-2">
            <button
              onClick={onReject}
              disabled={loading}
              className="flex-1 bg-red-600 text-white py-2 px-3 md:px-4 rounded text-xs md:text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Reject
            </button>
            <button
              onClick={onNotifyUnavailable}
              disabled={loading}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 md:px-4 rounded text-xs md:text-sm hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Notify Unavailable
            </button>
          </div>
        </div>
      )}

      {request.status !== 'PENDING' && (
        <div className="text-center py-2 text-sm text-gray-500">
          Request {request.status.toLowerCase()}
        </div>
      )}
    </div>
  )
}

export default RequestCard
