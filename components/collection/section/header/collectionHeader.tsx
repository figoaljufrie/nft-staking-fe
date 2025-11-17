"use client";

import { motion } from "framer-motion";

interface CollectionHeaderProps {
  totalNFTs: number;
}

export default function CollectionHeader({ totalNFTs }: CollectionHeaderProps) {
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
            NFT_COLLECTION_v1.0
          </span>
        </h1>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="font-mono text-sm text-gray-700">
              COLLECTION_ACTIVE
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <span className="font-mono text-sm text-gray-700">
            TOTAL: {totalNFTs}
          </span>
          <div className="w-px h-4 bg-gray-300" />
          <span className="font-mono text-sm text-gray-700">
            CHAIN: ETHEREUM
          </span>
        </div>
      </div>
    </motion.div>
  );
}