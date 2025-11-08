"use client";

import { motion } from "framer-motion";

export default function DetailsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
      className="absolute left-1/2 -translate-x-1/2 top-1/3 max-w-md"
    >
      <div className="bg-white/30 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-gray-200 text-lg">
          Simple 3-step process to start earning
        </p>
      </div>
    </motion.div>
  );
}