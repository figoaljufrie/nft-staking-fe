"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  scrollProgress: number;
}

export default function ContentOverlay({ scrollProgress }: Props) {
  // Calculate which content section to show
  const getSection = () => {
    if (scrollProgress < 0.25) return "hero";
    if (scrollProgress < 0.5) return "features";
    if (scrollProgress < 0.75) return "rewards";
    return "cta";
  };

  const activeSection = getSection();

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Hero Section (0-25%) */}
      <AnimatePresence>
        {activeSection === "hero" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center text-white px-4">
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                NFT Staking
              </h1>
              <p className="text-xl md:text-2xl opacity-80">
                Scroll to explore the experience
              </p>
              <div className="mt-8 animate-bounce">
                <svg
                  className="w-6 h-6 mx-auto text-white"
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
        )}
      </AnimatePresence>

      {/* Features Section (25-50%) */}
      <AnimatePresence>
        {activeSection === "features" && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8 }}
            className="absolute left-8 md:left-20 top-1/4 max-w-md"
          >
            <div className="bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stake & Earn
              </h2>
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
        )}
      </AnimatePresence>

      {/* Rewards Section (50-75%) */}
      <AnimatePresence>
        {activeSection === "rewards" && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute right-8 md:right-20 top-1/3 max-w-md"
          >
            <div className="bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Maximum Rewards
              </h2>
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
        )}
      </AnimatePresence>

      {/* CTA Section (75-100%) */}
      <AnimatePresence>
        {activeSection === "cta" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center pointer-events-auto">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                Ready to Start?
              </h2>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-bold rounded-xl hover:scale-105 transition-transform shadow-2xl">
                  Mint NFT
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-colors">
                  View Collection
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-8 left-8 z-50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-32 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-t from-green-400 to-blue-500"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-white text-sm font-mono">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
