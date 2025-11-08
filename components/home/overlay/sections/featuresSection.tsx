"use client";

import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.8 }}
      className="absolute left-8 md:left-20 top-1/4 max-w-md"
    >
      <div className="bg-white/30 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-4">Stake & Earn</h2>
        <p className="text-gray-200 text-lg mb-6">
          Lock your NFTs and earn passive rewards 24/7
        </p>
        <ul className="space-y-3 text-gray-100">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            0.001 tokens per second
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            No lock-up period
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Withdraw anytime
          </li>
        </ul>
      </div>
    </motion.div>
  );
}