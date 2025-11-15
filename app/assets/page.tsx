// app/assets/page.tsx
"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits, isAddress } from "viem";
import Image from "next/image";

// NFT Hooks
import {
  useAllTokensOfOwner,
  useBalanceOf as useNFTBalance,
} from "@/features/nft/hooks/read/useNftOwner";
import { useSafeTransferFrom } from "@/features/nft/hooks/write/useNftTransfer";
import { useBurn } from "@/features/nft/hooks/write/useNftBurn";

// Reward Token Hooks
import { useBalanceOf as useRewardBalance } from "@/features/Reward/hooks/read/useRewardSupply";

import {
  useRewardTokenSymbol,
  useRewardTokenDecimals,
} from "@/features/Reward/hooks/read/useRewardInfo";

export default function AssetsPage() {
  const { address, isConnected } = useAccount();

  // NFT Data
  const { data: nftTokenIds, isLoading: nftsLoading } =
    useAllTokensOfOwner(address);
  const { data: nftBalance } = useNFTBalance(address);

  // Reward Token Data
  const { data: rewardBalance } = useRewardBalance(address);
  const { data: rewardSymbol } = useRewardTokenSymbol();
  const { data: rewardDecimals } = useRewardTokenDecimals();

  // Write hooks
  const safeTransfer = useSafeTransferFrom();
  const burn = useBurn();

  // State
  const [selectedTokenId, setSelectedTokenId] = useState<bigint | null>(null);
  const [transferModal, setTransferModal] = useState(false);
  const [burnModal, setBurnModal] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [isBurning, setIsBurning] = useState(false);

  const handleTransfer = async () => {
    if (!selectedTokenId || !address || !isAddress(transferAddress)) return;

    setIsTransferring(true);
    try {
      await safeTransfer.mutateAsync({
        from: address,
        to: transferAddress as `0x${string}`,
        tokenId: selectedTokenId,
      });

      setTransferModal(false);
      setTransferAddress("");
      setSelectedTokenId(null);
      alert("Transfer successful!");
    } catch (error: any) {
      console.error("Transfer failed:", error);
      alert(error.message || "Transfer failed");
    } finally {
      setIsTransferring(false);
    }
  };

  const handleBurn = async () => {
    if (!selectedTokenId) return;

    setIsBurning(true);
    try {
      await burn.mutateAsync(selectedTokenId);

      setBurnModal(false);
      setSelectedTokenId(null);
      alert("NFT burned successfully!");
    } catch (error: any) {
      console.error("Burn failed:", error);
      alert(error.message || "Burn failed");
    } finally {
      setIsBurning(false);
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
  //           Connect your wallet to view your assets
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
            Loading your assets...
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
            My Assets
          </h1>
          <p className="text-xl text-gray-600">
            Manage your NFTs and token balances
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* NFT Balance */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-100 mb-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  NFT Balance
                </div>
                <div className="text-5xl font-bold mb-2">
                  {nftBalance?.toString() || "0"}
                </div>
                <div className="text-sm text-blue-100">Total NFTs Owned</div>
              </div>
              <svg
                className="w-24 h-24 text-white/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Reward Token Balance */}
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-100 mb-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {rewardSymbol || "Reward Token"} Balance
                </div>
                <div className="text-5xl font-bold mb-2">
                  {rewardBalance && rewardDecimals
                    ? parseFloat(
                        formatUnits(rewardBalance, rewardDecimals)
                      ).toFixed(2)
                    : "0.00"}
                </div>
                <div className="text-sm text-green-100">Reward Tokens</div>
              </div>
              <svg
                className="w-24 h-24 text-white/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* NFT Collection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Your NFT Collection
            </h2>
            {nftTokenIds && nftTokenIds.length > 0 && (
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                {nftTokenIds.length} NFT{nftTokenIds.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {nftTokenIds && nftTokenIds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nftTokenIds.map((tokenId) => (
                <NFTCard
                  key={tokenId.toString()}
                  tokenId={tokenId}
                  onTransfer={() => {
                    setSelectedTokenId(tokenId);
                    setTransferModal(true);
                  }}
                  onBurn={() => {
                    setSelectedTokenId(tokenId);
                    setBurnModal(true);
                  }}
                />
              ))}
            </div>
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
                No NFTs Yet
              </h3>
              <p className="text-xl text-gray-600 mb-6">
                Start your collection by minting your first NFT!
              </p>
              <a
                href="/mint"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Go to Mint Page
              </a>
            </div>
          )}
        </div>

        {/* Transfer Modal */}
        {transferModal && (
          <Modal
            title="Transfer NFT"
            onClose={() => !isTransferring && setTransferModal(false)}
          >
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex">
                  <svg
                    className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-sm text-yellow-800">
                    Make sure you trust the recipient address. This action
                    cannot be undone.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {transferAddress && !isAddress(transferAddress) && (
                  <p className="mt-2 text-sm text-red-600">Invalid address</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Token ID:</span>
                  <span className="font-bold text-gray-900">
                    #{selectedTokenId?.toString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setTransferModal(false)}
                  disabled={isTransferring}
                  className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransfer}
                  disabled={!isAddress(transferAddress) || isTransferring}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isTransferring ? (
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
                      Transferring...
                    </>
                  ) : (
                    "Transfer"
                  )}
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Burn Modal */}
        {burnModal && (
          <Modal
            title="Burn NFT"
            onClose={() => !isBurning && setBurnModal(false)}
          >
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex">
                  <svg
                    className="w-5 h-5 text-red-600 mr-3 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-red-800 font-semibold">
                      Warning: This action is irreversible!
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      Once burned, this NFT will be permanently destroyed and
                      cannot be recovered.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">
                    Token ID to Burn:
                  </span>
                  <span className="font-bold text-red-600">
                    #{selectedTokenId?.toString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setBurnModal(false)}
                  disabled={isBurning}
                  className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBurn}
                  disabled={isBurning}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {isBurning ? (
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
                      Burning...
                    </>
                  ) : (
                    "Burn NFT"
                  )}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

// NFT Card Component
interface NFTCardProps {
  tokenId: bigint;
  onTransfer: () => void;
  onBurn: () => void;
}

function NFTCard({ tokenId, onTransfer, onBurn }: NFTCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative aspect-square bg-gradient-to-br from-blue-100 to-purple-100">
        <Image
          src="/images/placeholder.png"
          alt={`NFT #${tokenId.toString()}`}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          Owned
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          NFT #{tokenId.toString()}
        </h3>
        <p className="text-sm text-gray-600 mb-4">Your owned NFT</p>

        <div className="flex gap-2">
          <button
            onClick={onTransfer}
            className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Transfer
          </button>
          <button
            onClick={onBurn}
            className="flex-1 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Burn
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal Component
interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
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
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
