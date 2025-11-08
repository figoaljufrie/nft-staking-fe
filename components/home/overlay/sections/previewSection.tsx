"use client";

import { motion } from "framer-motion";

export default function PreviewSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8 }}
      className="absolute left-1/2 -translate-x-1/2 bottom-1/4 max-w-md"
    >
      <div className="bg-white/30 backdrop-blur-xl p-8 rounded-2xl border border-white/20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Almost There...</h2>
        <p className="text-gray-200 text-lg">
          Keep scrolling for the final reveal
        </p>
      </div>
    </motion.div>
  );
}