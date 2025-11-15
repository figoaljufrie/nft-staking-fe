// app/mint/page.tsx
"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import Image from "next/image";

// Hooks
import { useAvailableNFTs } from "@/features/nft/hooks/read/useNftPrice";
import { useMintPrice } from "@/features/nft/hooks/read/useNftPrice";
import {
  useNFTName,
  useNFTSymbol,
  useTotalSupply,
  useMaxSupply,
} from "@/features/nft/hooks/read/useNftInfo";
import { useMintPublic } from "@/features/nft/hooks/write/useNftMint";

interface NFTMetadata {
  tokenId: bigint;
  name: string;
  image: string;
  description: string;
}

export default function MintPage() {
  const { address, isConnected } = useAccount();

  // Read hooks
  const { data: availableNFTs, isLoading: nftsLoading } = useAvailableNFTs();
  const { data: mintPrice } = useMintPrice();
  const { data: nftName } = useNFTName();
  const { data: nftSymbol } = useNFTSymbol();
  const { data: totalSupply } = useTotalSupply();
  const { data: maxSupply } = useMaxSupply();

  // Write hook
  const mintPublic = useMintPublic();

  // State
  const [selectedNFT, setSelectedNFT] = useState<NFTMetadata | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleMint = async () => {
    if (!selectedNFT || !mintPrice) return;

    setIsMinting(true);
    setTxHash(null);

    try {
      // Generate tokenURI (in production, this would be IPFS or metadata server)
      const tokenURI = `ipfs://QmExample/${selectedNFT.tokenId}`;

      const tx = await mintPublic.mutateAsync({
        tokenURI,
        value: mintPrice,
      });

      setTxHash(tx);

      // Close modal after successful mint
      setTimeout(() => {
        setSelectedNFT(null);
        setTxHash(null);
      }, 3000);
    } catch (error: any) {
      console.error("Mint failed:", error);
      alert(error.message || "Minting failed. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  // if (!isConnected) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
  //       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
  //         <svg
  //           className="w-20 h-20 mx-auto text-blue-500 mb-6"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth={2}
  //             d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  //           />
  //         </svg>
  //         <h2 className="text-3xl font-bold text-gray-900 mb-3">
  //           Connect Your Wallet
  //         </h2>
  //         <p className="text-gray-600">
  //           Connect your wallet to mint NFTs from this collection
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  if (nftsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">
            Loading available NFTs...
          </p>
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
            Mint NFT
          </h1>
          <p className="text-xl text-gray-600">
            Choose from available NFTs and mint them to your wallet
          </p>
        </div>

        {/* Collection Info Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">
                {nftName || "NFT Collection"}
              </h2>
              <div className="flex items-center gap-4 text-blue-100">
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  {nftSymbol}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  {totalSupply?.toString()} / {maxSupply?.toString()} Minted
                </span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-sm text-blue-100 mb-2">Mint Price</div>
              <div className="text-4xl font-bold">
                {mintPrice ? formatEther(mintPrice) : "0"} ETH
              </div>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        {availableNFTs && availableNFTs.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Available NFTs ({availableNFTs.length})
              </h2>
              <p className="text-gray-600">
                Select an NFT to view details and mint
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableNFTs.map((nft) => (
                <NFTCard
                  key={nft.tokenId.toString()}
                  nft={nft}
                  onClick={() => setSelectedNFT(nft)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-400 mb-6"
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
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              All NFTs Minted!
            </h3>
            <p className="text-xl text-gray-600 mb-6">
              This collection has been fully minted. Check the marketplace for
              available NFTs.
            </p>
            <a
              href="/assets"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              View Your Assets
            </a>
          </div>
        )}

        {/* Mint Modal */}
        {selectedNFT && (
          <MintModal
            nft={selectedNFT}
            mintPrice={mintPrice}
            collectionSymbol={nftSymbol}
            isMinting={isMinting}
            txHash={txHash}
            onClose={() => !isMinting && setSelectedNFT(null)}
            onMint={handleMint}
          />
        )}
      </div>
    </div>
  );
}

// NFT Card Component
interface NFTCardProps {
  nft: NFTMetadata;
  onClick: () => void;
}

function NFTCard({ nft, onClick }: NFTCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
        <Image
          src={nft.image}
          alt={nft.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{nft.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {nft.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Token #{nft.tokenId.toString()}
          </span>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            Available
          </span>
        </div>
      </div>
    </div>
  );
}

// Mint Modal Component
interface MintModalProps {
  nft: NFTMetadata;
  mintPrice?: bigint;
  collectionSymbol?: string;
  isMinting: boolean;
  txHash: string | null;
  onClose: () => void;
  onMint: () => void;
}

function MintModal({
  nft,
  mintPrice,
  collectionSymbol,
  isMinting,
  txHash,
  onClose,
  onMint,
}: MintModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Mint NFT</h2>
          {!isMinting && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {txHash ? (
            // Success State
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Successfully Minted!
              </h3>
              <p className="text-gray-600 mb-6">
                Your NFT has been minted successfully
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Transaction Hash:</p>
                <p className="text-xs font-mono text-gray-900 break-all">
                  {txHash}
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            // Mint Form
            <>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 mb-6">
                <Image
                  src={nft.image}
                  alt={nft.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {nft.name}
                </h3>
                <p className="text-gray-600">{nft.description}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Token ID</span>
                  <span className="text-gray-900 font-bold">
                    #{nft.tokenId.toString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Collection</span>
                  <span className="text-gray-900 font-bold">
                    {collectionSymbol || "NFT"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-gray-700 font-medium text-lg">
                    Price
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {mintPrice ? formatEther(mintPrice) : "0"} ETH
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  disabled={isMinting}
                  className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={onMint}
                  disabled={isMinting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isMinting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Minting...
                    </>
                  ) : (
                    "Confirm Mint"
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                You will be prompted to confirm this transaction in your wallet
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
