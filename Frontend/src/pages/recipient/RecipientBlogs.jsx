import React from 'react'
import { motion } from 'framer-motion'
import AnimatedBg from '../../components/AnimatedBg'

const RecipientBlogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Your Health Journey",
      excerpt: "A comprehensive guide for recipients on managing their health while waiting for donations.",
      author: "Dr. Maria Rodriguez",
      date: "2024-01-15",
      readTime: "6 min read",
      category: "Health",
      image: "🏥"
    },
    {
      id: 2,
      title: "Coping with the Waiting Period",
      excerpt: "Mental health strategies and support systems for recipients during the donation waiting period.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-12",
      readTime: "5 min read",
      category: "Wellness",
      image: "🧠"
    },
    {
      id: 3,
      title: "Preparing for Your Transplant",
      excerpt: "Essential steps and preparations needed before undergoing organ transplantation.",
      author: "Dr. Michael Chen",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Guide",
      image: "❤️"
    },
    {
      id: 4,
      title: "Nutrition for Recovery",
      excerpt: "Dietary guidelines and nutrition tips for optimal recovery after donation procedures.",
      author: "Nutritionist Lisa Wang",
      date: "2024-01-08",
      readTime: "4 min read",
      category: "Nutrition",
      image: "🥗"
    },
    {
      id: 5,
      title: "Building Your Support Network",
      excerpt: "How to build and maintain a strong support system during your health journey.",
      author: "Counselor Emily Davis",
      date: "2024-01-05",
      readTime: "5 min read",
      category: "Support",
      image: "🤝"
    },
    {
      id: 6,
      title: "Success Stories: Life After Transplant",
      excerpt: "Inspiring stories from recipients who have successfully received donations and their recovery journeys.",
      author: "LifeLink Team",
      date: "2024-01-03",
      readTime: "8 min read",
      category: "Stories",
      image: "🌟"
    }
  ]

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
            Health & Recovery Blogs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Educational content, support resources, and inspiring stories for recipients and their families.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="p-6 border border-white/20 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              <div className="text-4xl mb-4">{post.image}</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Support Resources */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 border border-white/20 rounded-2xl bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-xl shadow-xl"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Need Support?</h3>
            <p className="text-gray-600 mb-6">Connect with our support groups and counseling services for additional help.</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
                Join Support Group
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
                Contact Counselor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RecipientBlogs
