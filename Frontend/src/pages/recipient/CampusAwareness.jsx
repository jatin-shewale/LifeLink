import React from 'react'
import { FaTint, FaHandHoldingHeart, FaHeart, FaExclamationTriangle, FaUser, FaLightbulb, FaCalendarAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import AnimatedBg from '../../components/AnimatedBg'

const CampusAwareness = () => {
  return (
    <div className="relative min-h-dvh">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBg />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-indigo-50/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-8 px-4 sm:px-6 lg:px-8 pb-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 pt-8"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Campus Health Awareness
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Educational resources and awareness programs for students and community members about health, donation, and emergency response.
          </p>
        </motion.div>

        {/* Awareness Programs Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Blood Donation Awareness */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <FaTint className="text-red-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Blood Donation Awareness</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Regular campus blood drives</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Educational workshops</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Student volunteer programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Emergency response training</span>
              </li>
            </ul>
          </div>

          {/* Organ Donation Education */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <FaHandHoldingHeart className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Organ Donation Education</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Myth vs fact sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Medical student presentations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Donor family stories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Registration drives</span>
              </li>
            </ul>
          </div>

          {/* Mental Health Support */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <FaHeart className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Mental Health Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Counseling services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Stress management workshops</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Peer support groups</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Crisis intervention training</span>
              </li>
            </ul>
          </div>

          {/* Emergency Response Training */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-orange-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Response Training</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>CPR certification courses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>First aid workshops</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Emergency preparedness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Disaster response training</span>
              </li>
            </ul>
          </div>

          {/* Health Screenings */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <FaUser className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Screenings</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Blood pressure checks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Blood type testing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Health risk assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Nutrition counseling</span>
              </li>
            </ul>
          </div>

          {/* Community Outreach */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <FaLightbulb className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Outreach</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Local hospital partnerships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>School health programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Senior center visits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Health fairs and events</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 border border-white/20 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-xl shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="text-blue-600" />
            </div>
            Upcoming Campus Events
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white/50 rounded-xl">
              <h4 className="font-semibold text-gray-900">Blood Drive</h4>
              <p className="text-sm text-gray-600">Student Center</p>
              <p className="text-sm text-blue-600 font-medium">Jan 25, 2024</p>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <h4 className="font-semibold text-gray-900">Health Fair</h4>
              <p className="text-sm text-gray-600">Campus Plaza</p>
              <p className="text-sm text-blue-600 font-medium">Feb 10, 2024</p>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <h4 className="font-semibold text-gray-900">CPR Training</h4>
              <p className="text-sm text-gray-600">Health Sciences Building</p>
              <p className="text-sm text-blue-600 font-medium">Feb 15, 2024</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CampusAwareness
