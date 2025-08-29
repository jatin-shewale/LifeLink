import React from 'react'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaClock, FaMapMarkedAlt, FaHeartbeat, FaUserMd, FaServer, FaBolt, FaUserPlus, FaSignInAlt, FaCheckCircle } from 'react-icons/fa'
import AnimatedBg from '../components/AnimatedBg'
import { useAuthStore } from '../store/auth'

const Landing = () => {
  const { user } = useAuthStore()
  return (
    <div className="relative min-h-dvh bg-white text-gray-900">
      <AnimatedBg />
      <main className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100">
              <FaHeartbeat /> Trusted by hospitals and NGOs
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              LifeLink connects donors and recipients in real-time
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl">
              24×7 availability, secure authentication, smart matching by blood type and location, and an admin dashboard to keep everything verified and safe.
            </p>
            {!user && (
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-600/20 transition">
                  <FaUserPlus /> Get Started
                </Link>
                <Link to="/login" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border bg-white/70 backdrop-blur hover:bg-white transition">
                  <FaSignInAlt /> Sign In
                </Link>
              </div>
            )}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
              <StatCard value="24/7" label="Availability" />
              <StatCard value="99.9%" label="Secure & Safe" />
              <StatCard value="⚡" label="Fast Matching" />
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard icon={<FaShieldAlt />} title="Bank‑grade security" text="Email/password with optional OTP, JWT, and strict RBAC keep data protected." />
              <FeatureCard icon={<FaClock />} title="Real-time coordination" text="Instant notifications for matches, status changes, and schedules." />
              <FeatureCard icon={<FaMapMarkedAlt />} title="Smart matching" text="Best-fit donors by blood type, organ pledge, distance and live availability." />
              <FeatureCard icon={<FaUserMd />} title="Human verification" text="Admins verify identities, review eligibility, and approve requests safely." />
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">Why LifeLink</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <InfoCard icon={<FaServer />} title="Scalable infrastructure" text="Elastic architecture keeps the platform responsive during emergency surges and donation drives." />
            <InfoCard icon={<FaBolt />} title="High reliability" text="Observability, error tracking, and automated health checks deliver consistent uptime." />
            <InfoCard icon={<FaHeartbeat />} title="Healthcare-focused" text="Designed with clinical workflows in mind to accelerate life‑saving outcomes." />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">How it works</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <StepCard step="1" title="Create your account" text="Choose your role and set up your secure profile." icon={<FaUserPlus className="text-rose-600" />} />
            <StepCard step="2" title="Post or find a request" text="Submit your needs or explore nearby donors and matches." icon={<FaHeartbeat className="text-rose-600" />} />
            <StepCard step="3" title="Get matched quickly" text="We prioritize compatibility, urgency and distance to act fast." icon={<FaCheckCircle className="text-rose-600" />} />
          </div>
        </section>

        <section className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white">
            <div className="absolute inset-0 opacity-20">
              <AnimatedBg />
            </div>
            <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row items-center md:items-center md:justify-between gap-6">
              <div>
                <div className="text-sm uppercase tracking-wide text-white/80 font-semibold">Ready to help save lives?</div>
                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">Join LifeLink today — every action counts</h3>
                <p className="mt-2 text-white/90 max-w-2xl">Whether you are a donor or a recipient, our platform connects you securely and swiftly to the right people.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-rose-700 hover:bg-rose-50 transition shadow">
                  <FaUserPlus /> Get Started
                </Link>
                <Link to="/login" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 transition">
                  <FaSignInAlt /> Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Landing

const FeatureCard = ({ icon, title, text }) => (
  <div className="p-5 rounded-xl border bg-white/80 backdrop-blur hover:shadow-lg transition group ring-1 ring-transparent hover:ring-rose-300 hover:border-rose-300">
    <div className="text-rose-600 text-xl group-hover:scale-110 transition inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-50">{icon}</div>
    <div className="mt-2 font-semibold text-base sm:text-lg">{title}</div>
    <div className="text-sm sm:text-[0.95rem] leading-relaxed text-gray-600 mt-1">{text}</div>
  </div>
)

const InfoCard = ({ icon, title, text }) => (
  <div className="p-5 rounded-xl border bg-white hover:shadow-md transition ring-1 ring-transparent hover:ring-rose-300 hover:border-rose-300">
    <div className="text-gray-800 text-lg inline-flex items-center gap-2">{icon} <span className="font-semibold">{title}</span></div>
    <div className="text-sm text-gray-600 mt-2">{text}</div>
  </div>
)

const StatCard = ({ value, label }) => (
  <div className="p-5 rounded-2xl border bg-white/80 backdrop-blur hover:shadow-lg transition ring-1 ring-transparent hover:ring-rose-300 hover:border-rose-300">
    <div className="text-3xl font-extrabold">{value}</div>
    <div className="text-xs text-gray-600 mt-1">{label}</div>
  </div>
)

const StepCard = ({ step, title, text, icon }) => (
  <div className="p-5 rounded-xl border bg-white/80 backdrop-blur hover:shadow-lg transition ring-1 ring-transparent hover:ring-rose-300 hover:border-rose-300">
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-700 text-sm font-bold">{step}</div>
      <div className="inline-flex items-center gap-2 text-rose-600">{icon}</div>
    </div>
    <div className="mt-2 font-semibold text-base sm:text-lg">{title}</div>
    <div className="text-sm sm:text-[0.95rem] leading-relaxed text-gray-600 mt-1">{text}</div>
  </div>
)
