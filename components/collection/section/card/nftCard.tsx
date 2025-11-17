"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/glassCard";

interface CollectionNFTCardProps {
  tokenId: bigint;
  owner: `0x${string}`;
  metadata?: {
    name: string;
    image: string;
    description: string;
  };
}

export function CollectionNFTCard({ tokenId, owner, metadata }: CollectionNFTCardProps) {
  const truncatedOwner = `${owner.slice(0, 6)}...${owner.slice(-4)}`;
  const displayName = metadata?.name || `NFT #${tokenId.toString()}`;
  const imageUrl = metadata?.image || "/images/placeholder.png";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <GlassCard className="p-0 overflow-hidden h-full" delay={0}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          <Image
            src={imageUrl}
            alt={displayName}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-gray-950 border-2 border-green-600 text-green-600 text-xs font-bold px-3 py-1 font-mono">
            #{tokenId.toString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 bg-black">
          <h3 className="text-lg font-bold text-white mb-2 font-mono truncate">{displayName}</h3>
          <p className="text-sm text-green-600 mb-4 line-clamp-2 font-mono">
            {metadata?.description || "No description available"}
          </p>

          {/* Owner Info */}
          <div className="border-t border-green-600/30 pt-4 mb-4">
            <div className="group relative overflow-hidden p-3 bg-transparent hover:bg-gray-900 transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41] to-[#008F11] opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41] via-[#008F11] to-[#00FF41] opacity-15 group-hover:opacity-100 transition-opacity blur-sm animate-pulse" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs text-green-600 uppercase tracking-wide font-mono font-bold">
                  OWNER
                </span>
                <Link 
                  href={`https://etherscan.io/address/${owner}`}
                  target="_blank"
                  className="text-sm font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  {truncatedOwner}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => window.open(`https://etherscan.io/address/${owner}`, '_blank')}
              className="flex-1 bg-gray-950 text-green-600 border border-green-600 font-semibold py-2 px-3 hover:bg-green-950 transition-colors text-xs font-mono"
            >
              VIEW_OWNER
            </button>
            <button
              onClick={() => window.open(`https://opensea.io/assets/ethereum/${process.env.NEXT_PUBLIC_NFT_ADDRESS}/${tokenId.toString()}`, '_blank')}
              className="flex-1 bg-gray-950 text-cyan-400 border border-cyan-400 font-semibold py-2 px-3 hover:bg-cyan-950 transition-colors text-xs font-mono"
            >
              OPENSEA
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}