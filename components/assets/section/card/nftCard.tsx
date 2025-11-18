"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface NFTCardProps {
  tokenId: bigint;
  index: number;
  onTransfer: () => void;
  onBurn: () => void;
}

export default function NFTCard({
  tokenId,
  index,
  onTransfer,
  onBurn,
}: NFTCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative bg-gray-950 border border-gray-800 hover:border-green-600 transition-all overflow-hidden group"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/0 group-hover:from-green-600/5 group-hover:to-green-600/20 transition-all" />

      <div className="relative aspect-square bg-gray-900">
        <Image
          src="/images/placeholder.png"
          alt={`NFT #${tokenId.toString()}`}
          fill
          className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute top-2 right-2 px-3 py-1 bg-gray-950/90 border border-emerald-400/50 backdrop-blur-sm">
          <span className="text-xs font-mono text-emerald-400 font-bold">
            OWNED
          </span>
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
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

      <div className="p-4 relative">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-500 font-mono">TOKEN_ID:</span>
            <span className="text-xs text-green-600 font-mono">
              {tokenId.toString()}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-mono">
            NFT #{tokenId.toString()}
          </h3>
          <p className="text-xs text-gray-400 font-mono">STATUS: ACTIVE</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onTransfer}
            className="px-4 py-2 bg-gray-900 border border-cyan-400/50 text-cyan-400 font-mono text-xs hover:bg-cyan-400 hover:text-black transition-all"
          >
            ./transfer
          </button>
          <button
            onClick={onBurn}
            className="px-4 py-2 bg-gray-900 border border-red-400/50 text-red-400 font-mono text-xs hover:bg-red-400 hover:text-black transition-all"
          >
            ./burn
          </button>
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