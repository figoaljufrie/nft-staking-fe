// components/collection/CollectionNFTCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={imageUrl}
          alt={displayName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          #{tokenId.toString()}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{displayName}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {metadata?.description || "No description available"}
        </p>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Owner
            </span>
            <Link 
              href={`https://etherscan.io/address/${owner}`}
              target="_blank"
              className="text-sm font-mono text-blue-600 hover:text-blue-800 hover:underline"
            >
              {truncatedOwner}
            </Link>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => window.open(`https://etherscan.io/address/${owner}`, '_blank')}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-xs"
            >
              View Owner
            </button>
            <button
              onClick={() => window.open(`https://opensea.io/assets/ethereum/${process.env.NEXT_PUBLIC_NFT_ADDRESS}/${tokenId.toString()}`, '_blank')}
              className="flex-1 bg-blue-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-xs"
            >
              View on OpenSea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}