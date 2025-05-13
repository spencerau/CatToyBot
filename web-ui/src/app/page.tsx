'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-[#2A2A3F]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01 }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mb-8 inline-block">
              <motion.div
                className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
                animate={{
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/cat.jpg"
                  alt="Curious cat"
                  width={256}
                  height={256}
                  className="rounded-full border-4 border-[#00F5FF] shadow-[0_0_30px_rgba(0,245,255,0.3)]"
                  priority
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 text-4xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  
                </motion.div>
              </motion.div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] bg-clip-text text-transparent">
              Smart Cat Rover
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Ever wanted a cool robot friend to play with your cat? Meet Whiskers, the interactive robot companion that keeps your feline friend entertained and active.
            </p>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] text-black font-semibold text-lg transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
            >
              Try it Now →
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-[#00F5FF]/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-l from-[#00A3FF]/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="p-6 rounded-xl bg-[#1A1A2E] border border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold mb-2 text-[#00F5FF]">Easy Control</h3>
            <p className="text-gray-400">Control your rover with a PS5 controller or keyboard for precise movements and interactions.</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-[#1A1A2E] border border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl mb-4">📹</div>
            <h3 className="text-xl font-semibold mb-2 text-[#00F5FF]">Live Video</h3>
            <p className="text-gray-400">Watch your cat&apos;s reactions in real-time with the built-in camera system.</p>
          </motion.div>

          <motion.div
            className="p-6 rounded-xl bg-[#1A1A2E] border border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2 text-[#00F5FF]">Smart Navigation</h3>
            <p className="text-gray-400">Advanced movement controls let you create engaging play sessions for your cat.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
