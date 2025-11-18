"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/glassCard";

interface RewardsPanelProps {
  data: {
    pendingRewards: string;
    stakedCount: number;
    rewardRate: string;
    rewardSymbol: string;
    canClaim: boolean | 0n | undefined;
  };
  isClaiming: boolean;
  onClaimRewards: () => void;
}

export default function RewardsPanel({
  data,
  isClaiming,
  onClaimRewards,
}: RewardsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Pending Rewards */}
      <GlassCard className="p-0 overflow-hidden" delay={0.1}>
        <div className="bg-white p-4 border-b border-green-600/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse" />
            <span className="font-mono text-green-600 font-bold text-sm tracking-wider">
              PENDING_REWARDS.sys
            </span>
          </div>
        </div>

        <div className="p-6">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-white font-mono tracking-wider">
                UNCLAIMED
              </span>
            </div>

            <div className="text-5xl font-bold text-white font-mono mb-2">
              {data.pendingRewards}
            </div>

            <div className="text-sm text-white font-mono mb-4">
              {data.rewardSymbol}
            </div>

            <button
              onClick={onClaimRewards}
              disabled={!data.canClaim || isClaiming}
              className="w-full px-4 py-3 bg-gray-950 border-2 border-emerald-400 text-emerald-400 font-mono text-sm hover:bg-emerald-400 hover:text-black transition-all disabled:opacity-50 disabled:border-gray-700 disabled:text-gray-600"
            >
              {isClaiming ? "CLAIMING..." : "./claim"}
            </button>
          </motion.div>
        </div>
      </GlassCard>

      {/* Total Staked */}
      <GlassCard className="p-0 overflow-hidden" delay={0.2}>
        <div className="bg-white p-4 border-b border-green-400/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse" />
            <span className="font-mono text-green-600 font-bold text-sm tracking-wider">
              STAKED_COUNT.sys
            </span>
          </div>
        </div>

        <div className="p-6">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm text-white font-mono tracking-wider">
                LOCKED_NFTS
              </span>
            </div>

            <div className="text-5xl font-black text-white font-mono mb-2">
              {data.stakedCount}
            </div>

            <div className="text-sm text-white font-mono">TOTAL_STAKED</div>
          </motion.div>
        </div>
      </GlassCard>

      {/* Reward Rate */}
      <GlassCard className="p-0 overflow-hidden" delay={0.3}>
        <div className="bg-white p-4 border-b border-green-400/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse" />
            <span className="font-mono text-green-600 font-bold text-sm tracking-wider">
              REWARD_RATE.sys
            </span>
          </div>
        </div>

        <div className="p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
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
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-sm text-white font-mono tracking-wider">
                DAILY_YIELD
              </span>
            </div>

            <div className="text-4xl font-bold text-white font-mono mb-2">
              {data.rewardRate}
            </div>

            <div className="text-sm text-white font-mono">
              PER_NFT/DAY
            </div>
          </motion.div>
        </div>
      </GlassCard>
    </div>
  );
}
