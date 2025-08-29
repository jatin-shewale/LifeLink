import React from 'react'
import { Link } from 'react-router-dom'

const QuickActionCard = ({ to, icon, title, text, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600 hover:border-blue-300 hover:ring-blue-300",
    green: "text-green-600 hover:border-green-300 hover:ring-green-300",
    red: "text-red-600 hover:border-red-300 hover:ring-red-300",
    purple: "text-purple-600 hover:border-purple-300 hover:ring-purple-300"
  }

  return (
    <Link 
      to={to} 
      className={`p-4 md:p-6 border rounded-xl bg-white hover:shadow transition-all duration-200 block ring-1 ring-transparent ${colorClasses[color]}`}
    >
      <div className="text-xl md:text-2xl mb-2 md:mb-3">{icon}</div>
      <div className="font-semibold text-base md:text-lg mb-1 md:mb-2">{title}</div>
      <div className="text-xs md:text-sm text-gray-600">{text}</div>
    </Link>
  )
}

export default QuickActionCard
