// app/collection/page.tsx
"use client";

import { useState } from "react";
import { useMintedNFTs } from "@/features/nft/hooks/read/useMintedNft";
import { CollectionNFTCard } from "@/components/collection/nftCard";
import Link from "next/link";

const ITEMS_PER_PAGE = 20;

export default function CollectionPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useMintedNFTs(page, ITEMS_PER_PAGE);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (data && page * ITEMS_PER_PAGE < data.total) {
      setPage(page + 1);
    }
  };

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;
  const startIndex = page * ITEMS_PER_PAGE + 1;
  const endIndex = data ? Math.min((page + 1) * ITEMS_PER_PAGE, data.total) : 0;

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading collection...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <svg className="w-20 h-20 mx-auto text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Error Loading Collection</h2>
          <p className="text-gray-600">Failed to fetch minted NFTs. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!data || data.total === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">No NFTs Minted Yet</h3>
          <p className="text-xl text-gray-600 mb-6">Be the first to mint an NFT from this collection!</p>
          <Link href="/mint" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all">
            Mint Your First NFT
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            NFT Collection
          </h1>
          <p className="text-xl text-gray-600">
            Explore all {data.total} minted NFTs
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">{data.total}</div>
              <div className="text-sm text-gray-600">Total Minted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{data.nfts.length}</div>
              <div className="text-sm text-gray-600">Shown on Page</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{page + 1}</div>
              <div className="text-sm text-gray-600">Current Page</div>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {data.nfts.map((nft) => (
            <CollectionNFTCard
              key={nft.tokenId.toString()}
              tokenId={nft.tokenId}
              owner={nft.owner}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex}-{endIndex} of {data.total} NFTs
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={page === 0}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg">
                  <span className="font-semibold text-gray-900">{page + 1}</span>
                  <span className="text-gray-600 mx-1">of</span>
                  <span className="text-gray-600">{totalPages}</span>
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}