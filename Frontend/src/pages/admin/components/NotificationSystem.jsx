import React, { useState, useEffect } from 'react'
import { FaBell, FaTimes, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa'
import { useAuthStore } from '../../../store/auth'
import { toast } from 'react-toastify'

const NotificationSystem = () => {
  const { token } = useAuthStore()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Initialize WebSocket connection for real-time notifications
    const socket = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:8000')
    
    socket.onopen = () => {
      console.log('WebSocket connected for notifications')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      handleNotification(data)
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => {
      socket.close()
    }
  }, [])

  const handleNotification = (data) => {
    const newNotification = {
      id: Date.now(),
      type: data.type || 'info',
      title: data.title || 'Notification',
      message: data.message || '',
      timestamp: new Date(),
      read: false
    }

    setNotifications(prev => [newNotification, ...prev])
    setUnreadCount(prev => prev + 1)

    // Show toast notification
    switch (data.type) {
      case 'success':
        toast.success(data.message)
        break
      case 'error':
        toast.error(data.message)
        break
      case 'warning':
        toast.warning(data.message)
        break
      default:
        toast.info(data.message)
    }
  }

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
    setUnreadCount(0)
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <FaCheckCircle className="text-green-600" />
      case 'error': return <FaExclamationTriangle className="text-red-600" />
      case 'warning': return <FaExclamationTriangle className="text-yellow-600" />
      default: return <FaInfoCircle className="text-blue-600" />
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50'
      case 'error': return 'border-red-200 bg-red-50'
      case 'warning': return 'border-yellow-200 bg-yellow-50'
      default: return 'border-blue-200 bg-blue-50'
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FaBell className="text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b ${getNotificationColor(notification.type)} ${
                    !notification.read ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-500">
                          {notification.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t">
              <button
                onClick={() => setNotifications([])}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationSystem
