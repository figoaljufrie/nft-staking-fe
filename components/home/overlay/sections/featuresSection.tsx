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
      <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-black mb-4font-mono">Stake & Earn</h2>
        <p className="text-gray-500 text-lg mb-6">
          Lock your NFTs and earn passive rewards 24/7
        </p>
        <ul className="space-y-3 text-gray-500">
          <li className="flex items-center gap-2">
            <span className="text-white font-mono">✓</span>
            0.001 tokens per second
          </li>
          <li className="flex items-center gap-2">
            <span className="text-white font-mono">✓</span>
            No lock-up period
          </li>
          <li className="flex items-center gap-2">
            <span className="text-white font-mono">✓</span>
            Withdraw anytime
          </li>
        </ul>
      </div>
    </motion.div>
  );
}