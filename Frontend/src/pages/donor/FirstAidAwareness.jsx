import React from 'react'
import { FaHeartbeat, FaTint, FaExclamationTriangle, FaLightbulb, FaHandHoldingHeart, FaPhone } from 'react-icons/fa'
import { motion } from 'framer-motion'
import AnimatedBg from '../../components/AnimatedBg'

const FirstAidAwareness = () => {
  return (
    <div className="relative min-h-dvh">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBg />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white/30 to-purple-50/50"></div>
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
          <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            First Aid & Health Awareness
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Essential knowledge for donors and health enthusiasts. Learn first aid techniques and stay informed about health awareness.
          </p>
        </motion.div>

        {/* First Aid Tips Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* CPR Tips */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <FaHeartbeat className="text-red-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">CPR Basics</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Check for responsiveness and breathing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Call emergency services immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>30 chest compressions, 2 rescue breaths</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Continue until help arrives</span>
              </li>
            </ul>
          </div>

          {/* Bleeding Control */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <FaTint className="text-red-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Bleeding Control</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Apply direct pressure to the wound</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Use clean cloth or sterile bandage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Elevate the injured area if possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Seek medical attention for severe bleeding</span>
              </li>
            </ul>
          </div>

          {/* Choking */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-orange-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Choking Response</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Ask "Are you choking?"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Perform 5 back blows between shoulder blades</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Give 5 abdominal thrusts (Heimlich maneuver)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Alternate until object is dislodged</span>
              </li>
            </ul>
          </div>

          {/* Burn Care */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-orange-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Burn Care</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Cool the burn with cool (not cold) water</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Remove jewelry and tight items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Cover with sterile bandage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Seek medical care for severe burns</span>
              </li>
            </ul>
          </div>

          {/* Health Tips */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <FaLightbulb className="text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Stay hydrated - drink 8 glasses of water daily</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Get adequate sleep (7-9 hours)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Exercise regularly for cardiovascular health</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Maintain a balanced diet</span>
              </li>
            </ul>
          </div>

          {/* Donation Preparation */}
          <div className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <FaHandHoldingHeart className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Donation Prep</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Get adequate sleep the night before</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Eat a healthy meal 3 hours before</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Stay hydrated - drink extra fluids</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Avoid alcohol 24 hours before</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Emergency Numbers */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 border border-white/20 rounded-2xl bg-gradient-to-r from-red-50/80 to-pink-50/80 backdrop-blur-xl shadow-xl"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <FaPhone className="text-red-600" />
            </div>
            Emergency Contact Numbers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/50 rounded-xl">
              <h4 className="font-semibold text-gray-900">Emergency Services</h4>
              <p className="text-2xl font-bold text-red-600">911</p>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <h4 className="font-semibold text-gray-900">Poison Control</h4>
              <p className="text-2xl font-bold text-red-600">1-800-222-1222</p>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <h4 className="font-semibold text-gray-900">LifeLink Emergency</h4>
              <p className="text-2xl font-bold text-red-600">1-800-LIFELINK</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FirstAidAwareness
