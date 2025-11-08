"use client";

import { motion } from "framer-motion";

export default function RewardsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
      className="absolute right-8 md:right-20 top-1/3 max-w-md"
    >
      <div className="bg-white/30 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-4">Maximum Rewards</h2>
        <p className="text-gray-200 text-lg mb-6">
          Earn more by staking multiple NFTs
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-green-400">10M</p>
            <p className="text-sm text-gray-300 mt-2">Total Supply</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-400">24/7</p>
            <p className="text-sm text-gray-300 mt-2">Auto Rewards</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}