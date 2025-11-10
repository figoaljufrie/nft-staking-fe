"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="text-center pointer-events-auto font-mono">
        <h2 className="text-5xl md:text-6xl font-bold text-black mb-8">
          Ready to Start?
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-black text-lg font-bold rounded-xl hover:scale-105 transition-transform shadow-2xl">
            Mint NFT
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-black text-lg font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-colors">
            View Collection
          </button>
        </div>
      </div>
    </motion.div>
  );
}