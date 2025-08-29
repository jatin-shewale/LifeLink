import React from 'react'
import { FaDonate, FaInbox, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'

const ActivityItem = ({ type, message, time, status }) => {
  const getIcon = () => {
    switch (type) {
      case 'donation': return <FaDonate className="text-green-600" />
      case 'request': return <FaInbox className="text-blue-600" />
      case 'approval': return <FaCheckCircle className="text-purple-600" />
      default: return <FaInfoCircle className="text-gray-600" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'emergency': return 'bg-red-100 text-red-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
          {getIcon()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-gray-900 truncate">{message}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
      </div>
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor()} flex-shrink-0`}>
        {status}
      </span>
    </div>
  )
}

export default ActivityItem
