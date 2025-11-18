"use client";

import GlassCard from "@/components/ui/glassCard";
import NFTCard from "../../assets/section/card/nftCard";

interface NFTCollectionProps {
  nftTokenIds: readonly bigint[] | undefined;
  onTransfer: (tokenId: bigint) => void;
  onBurn: (tokenId: bigint) => void;
}

export default function NFTCollection({
  nftTokenIds,
  onTransfer,
  onBurn,
}: NFTCollectionProps) {
  return (
    <GlassCard className="p-0 overflow-hidden" delay={0.3}>
      <div className="bg-white p-4 border-b border-fuchsia-400/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-green-600 font-bold text-sm tracking-wider">
            NFT_COLLECTION.db
          </span>
        </div>
        {nftTokenIds && nftTokenIds.length > 0 && (
          <div className="px-4 py-1 bg-gray-950 border border-fuchsia-400/50 rounded font-mono text-xs text-fuchsia-400">
            COUNT: {nftTokenIds.length}
          </div>
        )}
      </div>

      <div className="p-8">
        {nftTokenIds && nftTokenIds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nftTokenIds.map((tokenId, index) => (
              <NFTCard
                key={tokenId.toString()}
                tokenId={tokenId}
                index={index}
                onTransfer={() => onTransfer(tokenId)}
                onBurn={() => onBurn(tokenId)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-950 border-2 border-gray-800 rounded-lg mb-6">
              <svg
                className="w-16 h-16 text-gray-600 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white font-mono mb-3">
              NO_ASSETS_FOUND
            </h3>
            <p className="text-gray-400 font-mono text-sm mb-6">
              ./collection is empty. Initialize minting process?
            </p>
            <a
              href="/mint"
              className="inline-block px-8 py-3 bg-gray-950 border-2 border-green-600 text-green-600 font-mono hover:bg-green-600 hover:text-black transition-all"
            >
              ./mint --start
            </a>
          </div>
        )}
      </div>
    </GlassCard>
  );
}