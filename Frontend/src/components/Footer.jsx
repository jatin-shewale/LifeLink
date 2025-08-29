import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeartbeat, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart, FaArrowUp } from 'react-icons/fa'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-3 text-rose-400 font-bold text-xl">
              <FaHeartbeat className="text-2xl" />
              <span>LifeLink</span>
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm">
              Connecting donors and recipients to save lives through blood and organ donation. 
              Every donation creates a ripple effect of hope and healing.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <FaFacebook className="text-sm" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <FaTwitter className="text-sm" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <FaLinkedin className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/donor" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/recipient" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Find Donors
                </Link>
              </li>
              <li>
                <Link to="/donor" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Donor Portal
                </Link>
              </li>
              <li>
                <Link to="/recipient" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Recipient Portal
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Blood Donation Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Organ Donation Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Health Awareness
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  Emergency Contacts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-rose-400 transition-colors duration-200 text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <FaPhone className="text-rose-400 text-sm" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-rose-400 text-sm" />
                <span className="text-gray-300 text-sm">info@lifelink.org</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-rose-400 text-sm" />
                <span className="text-gray-300 text-sm">123 Health Street, Medical City, MC 12345</span>
              </div>
            </div>
            
            {/* Emergency Contact */}
            <div className="mt-4 p-3 bg-red-600/20 border border-red-500/30 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-1 text-sm">Emergency Contact</h4>
              <p className="text-xs text-gray-300">For urgent blood or organ requests</p>
              <p className="text-base font-bold text-red-400">1-800-LIFELINK</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 LifeLink. All rights reserved.</span>
              <FaHeart className="text-rose-400 animate-pulse" />
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-rose-600 hover:bg-rose-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-white text-sm" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


