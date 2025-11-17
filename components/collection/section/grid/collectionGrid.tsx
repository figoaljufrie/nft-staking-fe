"use client";

import { CollectionNFTCard } from "../card/nftCard";

interface NFT {
  tokenId: bigint;
  owner: `0x${string}`;
  metadata?: {
    name: string;
    image: string;
    description: string;
  };
}

interface CollectionGridProps {
  nfts: NFT[];
}

export default function CollectionGrid({ nfts }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {nfts.map((nft) => (
        <CollectionNFTCard
          key={nft.tokenId.toString()}
          tokenId={nft.tokenId}
          owner={nft.owner}
          metadata={nft.metadata}
        />
      ))}
    </div>
  );
}