import React from 'react'

const KPICard = ({ icon, label, value, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50", 
    orange: "text-orange-600 bg-orange-50",
    red: "text-red-600 bg-red-50",
    purple: "text-purple-600 bg-purple-50"
  }

  return (
    <div className="p-4 md:p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 md:gap-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <div className="text-xs md:text-sm text-gray-500 font-medium">{label}</div>
          <div className="text-xl md:text-2xl font-bold text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  )
}

export default KPICard
