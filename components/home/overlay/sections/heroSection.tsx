"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="text-center text-black px-4 font-mono">
        <h1 className="text-6xl md:text-8xl font-bold mb-4">NFT Staking</h1>
        <p className="text-xl md:text-2xl opacity-80">
          Scroll to explore the experience
        </p>
        <div className="mt-8 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
