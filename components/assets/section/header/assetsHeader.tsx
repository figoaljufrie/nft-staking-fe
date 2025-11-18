"use client";

import { motion } from "framer-motion";

interface AssetsHeaderProps {
  address: `0x${string}` | undefined;
  isConnected: boolean;
}

export default function AssetsHeader({
  address,
  isConnected,
}: AssetsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
      className="mb-12 relative"
    >
      <div className="relative">
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight relative font-mono">
          <span className="relative z-10 bg-clip-text text-black">
            ASSET_MANAGEMENT_v1.0
          </span>
        </h1>

        {/* Status bar */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected
                  ? "bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  : "bg-gray-500"
              } animate-pulse`}
            />
            <span className="font-mono text-sm text-gray-700">
              {isConnected ? "WALLET_CONNECTED" : "WALLET_OFFLINE"}
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <span className="font-mono text-sm text-gray-700">
            MODE: PORTFOLIO_VIEW
          </span>
          <div className="w-px h-4 bg-gray-300" />
          <span className="font-mono text-sm text-gray-700">
            STATUS: ACTIVE
          </span>
        </div>
      </div>

      {isConnected && address && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute top-0 right-0 px-6 py-3 rounded-lg bg-gray-950 border-2 border-fuchsia-400 shadow-[0_0_20px_rgba(236,72,153,0.2)] font-mono text-sm text-fuchsia-400"
        >
          ID: {address.slice(0, 6)}...{address.slice(-4)}
        </motion.div>
      )}
    </motion.div>
  );
}