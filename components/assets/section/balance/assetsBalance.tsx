"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/glassCard";

interface BalanceCardsProps {
  data: {
    nftBalance: string;
    rewardBalance: string;
    rewardSymbol: string;
  };
}

export default function BalanceCards({ data }: BalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* NFT Balance */}
      <GlassCard className="p-0 overflow-hidden" delay={0.1}>
        <div className="bg-white p-4 border-b border-green-400/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-600 animate-pulse" />
            <span className="font-mono text-green-600 font-bold text-sm tracking-wider">
              NFT_HOLDINGS.sys
            </span>
          </div>
        </div>

        <div className="p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm text-white font-mono tracking-wider">
                TOTAL_NFT_COUNT
              </span>
            </div>

            <div className="text-5xl font-bold text-white font-mono mb-2">
              {data.nftBalance}
            </div>

            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                />
              </div>
              <span className="text-xs text-white font-mono">OWNED</span>
            </div>
          </motion.div>
        </div>
      </GlassCard>

      {/* Reward Token Balance */}
      <GlassCard className="p-0 overflow-hidden" delay={0.2}>
        <div className="bg-white p-4 border-b border-green-400/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-green-600 font-bold text-sm tracking-wider">
              TOKEN_BALANCE.sys
            </span>
          </div>
        </div>

        <div className="p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-white font-mono tracking-wider">
                {data.rewardSymbol.toUpperCase()}
              </span>
            </div>

            <div className="text-5xl font-bold text-white font-mono mb-2">
              {data.rewardBalance}
            </div>

            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-green-600"
                />
              </div>
              <span className="text-xs text-white font-mono">
                AVAILABLE
              </span>
            </div>
          </motion.div>
        </div>
      </GlassCard>
    </div>
  );
}