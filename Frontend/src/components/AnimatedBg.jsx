import React from 'react'
import { motion } from 'framer-motion'

const bubble = (delay) => ({
	initial: { opacity: 0, scale: 0.8, y: 40 },
	animate: { opacity: 0.15, scale: 1, y: 0 },
	transition: { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const AnimatedBg = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-rose-200 blur-3xl opacity-50" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-indigo-200 blur-3xl opacity-50" />

      <motion.div className="absolute top-24 left-10 w-24 h-24 rounded-full bg-rose-400/40 blur-xl" initial={{opacity:0, y:20}} animate={{opacity:0.2, y:0}} transition={{duration:1.2}} />
      <motion.div className="absolute top-56 left-40 w-16 h-16 rounded-full bg-indigo-400/40 blur-xl" initial={{opacity:0, y:20}} animate={{opacity:0.2, y:0}} transition={{duration:1.2, delay:0.2}} />
      <motion.div className="absolute top-10 right-20 w-20 h-20 rounded-full bg-emerald-400/40 blur-xl" initial={{opacity:0, y:20}} animate={{opacity:0.2, y:0}} transition={{duration:1.2, delay:0.4}} />
      <motion.div className="absolute bottom-24 right-40 w-28 h-28 rounded-full bg-amber-400/40 blur-xl" initial={{opacity:0, y:20}} animate={{opacity:0.2, y:0}} transition={{duration:1.2, delay:0.6}} />
    </div>
  )
}

export default AnimatedBg


