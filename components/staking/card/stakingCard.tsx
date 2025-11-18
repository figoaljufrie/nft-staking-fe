"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface StakingNFTCardProps {
  tokenId: bigint;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  isStaked: boolean;
}

export default function StakingNFTCard({
  tokenId,
  index,
  isSelected,
  onSelect,
  isStaked,
}: StakingNFTCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={onSelect}
      className={`relative cursor-pointer overflow-hidden transition-all ${
        isSelected
          ? "bg-gray-900 border-2 border-green-600 scale-105 shadow-[0_0_30px_rgba(0,255,65,0.4)]"
          : "bg-gray-950 border border-gray-800 hover:border-green-600/50"
      }`}
    >
      {/* Corner accents */}
      <div
        className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-opacity ${
          isSelected ? "border-green-600 opacity-100" : "border-green-600 opacity-0"
        }`}
      />
      <div
        className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-opacity ${
          isSelected ? "border-green-600 opacity-100" : "border-green-600 opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-opacity ${
          isSelected ? "border-green-600 opacity-100" : "border-green-600 opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-opacity ${
          isSelected ? "border-green-600 opacity-100" : "border-green-600 opacity-0"
        }`}
      />

      {/* Glow effect on selection */}
      <div
        className={`absolute inset-0 bg-gradient-to-br transition-all ${
          isSelected
            ? "from-green-600/20 to-green-600/5"
            : "from-green-600/0 to-green-600/0"
        }`}
      />

      <div className="relative aspect-square bg-gray-900">
        <Image
          src="/images/placeholder.png"
          alt={`NFT #${tokenId.toString()}`}
          fill
          className="object-cover opacity-70"
        />

        {/* Status Badge */}
        {isStaked && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-gray-950/90 border border-emerald-400/50 backdrop-blur-sm">
            <span className="text-xs font-mono text-emerald-400 font-bold">
              STAKED
            </span>
          </div>
        )}

        {/* Selection Overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Scan line effect */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(rgba(0,255,65,0) 50%, rgba(0,255,65,0.1) 50%)",
              backgroundSize: "100% 4px",
              animation: "scan 3s linear infinite",
            }}
          />
        </div>
      </div>

      <div className="p-3 bg-gray-950 relative">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-mono">ID:</span>
          <span className="text-sm text-white font-mono font-bold">
            {tokenId.toString()}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(10px);
          }
        }
      `}</style>
    </motion.div>
  );
}