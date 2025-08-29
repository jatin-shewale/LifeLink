import React from 'react'
import { motion } from 'framer-motion'
import AnimatedBg from '../../components/AnimatedBg'

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Impact of Blood Donation on Community Health",
      excerpt: "Discover how regular blood donations contribute to community health and save countless lives every day.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Health",
      image: "🩸"
    },
    {
      id: 2,
      title: "Understanding Organ Donation: Myths vs Facts",
      excerpt: "Separate fact from fiction about organ donation and learn about the life-saving impact of organ transplants.",
      author: "Dr. Michael Chen",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Education",
      image: "❤️"
    },
    {
      id: 3,
      title: "Preparing for Your First Blood Donation",
      excerpt: "A comprehensive guide for first-time donors, covering everything from preparation to recovery.",
      author: "Nurse Emily Rodriguez",
      date: "2024-01-08",
      readTime: "4 min read",
      category: "Guide",
      image: "🏥"
    },
    {
      id: 4,
      title: "The Science Behind Blood Types and Compatibility",
      excerpt: "Explore the fascinating science of blood types and why compatibility matters in transfusions.",
      author: "Dr. James Wilson",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Science",
      image: "🔬"
    },
    {
      id: 5,
      title: "Mental Health and the Donation Process",
      excerpt: "Understanding the emotional aspects of donation and how to maintain mental well-being.",
      author: "Dr. Lisa Thompson",
      date: "2024-01-03",
      readTime: "5 min read",
      category: "Wellness",
      image: "🧠"
    },
    {
      id: 6,
      title: "Technology in Modern Healthcare: AI and Donation Matching",
      excerpt: "How artificial intelligence is revolutionizing donor-recipient matching and improving outcomes.",
      author: "Tech Expert Alex Kim",
      date: "2024-01-01",
      readTime: "8 min read",
      category: "Technology",
      image: "🤖"
    }
  ]

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
            Health & Donation Blogs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest insights, tips, and stories about health, donation, and community impact.
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
                <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
                <span className="text-gray-500 text-sm">{post.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
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

        {/* Newsletter Signup */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="p-8 border border-white/20 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-xl shadow-xl"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest health tips and donation stories.</p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Blogs
