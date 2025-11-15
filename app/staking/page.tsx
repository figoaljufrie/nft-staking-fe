"use client";

import { useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import Image from "next/image";

// Hooks
import { useAllTokensOfOwner } from "@/features/nft/hooks/read/useNftOwner";
import { useSetApprovalForAll } from "@/features/nft/hooks/write/useNftApproval";
import {
  useStakedTokens,
  usePendingRewards,
  useFullStake,
} from "@/features/staking/hooks/read/useStakingUser";
import { useRewardRate } from "@/features/staking/hooks/read/useStakingRewards";
import { useStake } from "@/features/staking/hooks/write/useStaking";
import { useWithdraw } from "@/features/staking/hooks/write/useStakingWithdraw";
import { useClaimRewards } from "@/features/staking/hooks/write/useStakingClaim";
import { useEmergencyUnstake } from "@/features/staking/hooks/write/useStakingUnstake";
import {
  useRewardTokenSymbol,
  useRewardTokenDecimals,
} from "@/features/Reward/hooks/read/useRewardInfo";

export default function StakingPage() {
  const { address, isConnected } = useAccount();

  // NFT Data
  const { data: allUserTokens, isLoading: tokensLoading } =
    useAllTokensOfOwner(address);
  const { data: stakedTokenIds, isLoading: stakedLoading } =
    useStakedTokens(address);

  // Staking Data
  const { data: pendingRewards } = usePendingRewards(address);
  const { data: fullStake } = useFullStake(address);
  const { data: rewardRate } = useRewardRate();

  // Token Info
  const { data: rewardSymbol } = useRewardTokenSymbol();
  const { data: rewardDecimals } = useRewardTokenDecimals();

  // Write hooks
  const setApprovalForAll = useSetApprovalForAll();
  const stake = useStake();
  const withdraw = useWithdraw();
  const claimRewards = useClaimRewards();
  const emergencyUnstake = useEmergencyUnstake();

  // State
  const [selectedUnstaked, setSelectedUnstaked] = useState<Set<bigint>>(
    new Set()
  );
  const [selectedStaked, setSelectedStaked] = useState<Set<bigint>>(new Set());
  const [isApproving, setIsApproving] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isEmergencyUnstaking, setIsEmergencyUnstaking] = useState(false);

  // Get staking contract address (you'll need to import this from your config)
  const STAKING_CONTRACT_ADDRESS = process.env
    .NEXT_PUBLIC_STAKING_MANAGER_ADDRESS as `0x${string}`;

  // Compute unstaked tokens
  const unstakedTokens = useMemo(() => {
    if (!allUserTokens || !stakedTokenIds) return [];
    const stakedSet = new Set(stakedTokenIds.map((id) => id.toString()));
    return allUserTokens.filter((id) => !stakedSet.has(id.toString()));
  }, [allUserTokens, stakedTokenIds]);

  const handleSelectUnstaked = (tokenId: bigint) => {
    setSelectedUnstaked((prev) => {
      const newSet = new Set(prev);
      newSet.has(tokenId) ? newSet.delete(tokenId) : newSet.add(tokenId);
      return newSet;
    });
  };

  const handleSelectStaked = (tokenId: bigint) => {
    setSelectedStaked((prev) => {
      const newSet = new Set(prev);
      newSet.has(tokenId) ? newSet.delete(tokenId) : newSet.add(tokenId);
      return newSet;
    });
  };

  const handleApproveAndStake = async () => {
    if (selectedUnstaked.size === 0) return;

    try {
      setIsApproving(true);
      await setApprovalForAll.mutateAsync({
        operator: STAKING_CONTRACT_ADDRESS,
        approved: true,
      });

      setIsApproving(false);
      setIsStaking(true);
      await stake.mutateAsync(Array.from(selectedUnstaked));

      setSelectedUnstaked(new Set());
      alert("NFTs staked successfully!");
    } catch (error: any) {
      console.error("Staking failed:", error);
      alert(error.message || "Staking failed");
    } finally {
      setIsApproving(false);
      setIsStaking(false);
    }
  };

  const handleWithdraw = async () => {
    if (selectedStaked.size === 0) return;

    setIsWithdrawing(true);
    try {
      await withdraw.mutateAsync(Array.from(selectedStaked));
      setSelectedStaked(new Set());
      alert("NFTs withdrawn successfully!");
    } catch (error: any) {
      console.error("Withdrawal failed:", error);
      alert(error.message || "Withdrawal failed");
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleClaimRewards = async () => {
    setIsClaiming(true);
    try {
      await claimRewards.mutateAsync();
      alert("Rewards claimed successfully!");
    } catch (error: any) {
      console.error("Claim failed:", error);
      alert(error.message || "Claim failed");
    } finally {
      setIsClaiming(false);
    }
  };

  const handleEmergencyUnstake = async () => {
    if (selectedStaked.size === 0) return;
    if (!confirm("Emergency unstake will forfeit pending rewards. Continue?"))
      return;

    setIsEmergencyUnstaking(true);
    try {
      await emergencyUnstake.mutateAsync(Array.from(selectedStaked));
      setSelectedStaked(new Set());
      alert("Emergency unstake successful!");
    } catch (error: any) {
      console.error("Emergency unstake failed:", error);
      alert(error.message || "Emergency unstake failed");
    } finally {
      setIsEmergencyUnstaking(false);
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
  //         <p className="text-gray-600">Connect your wallet to stake NFTs</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (tokensLoading || stakedLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">
            Loading staking data...
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
            Staking Hub
          </h1>
          <p className="text-xl text-gray-600">
            Stake your NFTs to earn rewards
          </p>
        </div>

        {/* Rewards Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="text-sm text-green-100 mb-2">Pending Rewards</div>
            <div className="text-4xl font-bold mb-2">
              {pendingRewards && rewardDecimals
                ? parseFloat(
                    formatUnits(pendingRewards, rewardDecimals)
                  ).toFixed(4)
                : "0.0000"}
            </div>
            <div className="text-sm text-green-100 mb-4">
              {rewardSymbol || "Tokens"}
            </div>
            <button
              onClick={handleClaimRewards}
              disabled={!pendingRewards || pendingRewards === 0n || isClaiming}
              className="w-full bg-white text-green-600 font-bold py-2 px-4 rounded-xl hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClaiming ? "Claiming..." : "Claim Rewards"}
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="text-sm text-blue-100 mb-2">Total Staked</div>
            <div className="text-4xl font-bold mb-2">
              {stakedTokenIds?.length || 0}
            </div>
            <div className="text-sm text-blue-100">NFTs</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="text-sm text-purple-100 mb-2">Reward Rate</div>
            <div className="text-4xl font-bold mb-2">
              {rewardRate?.toString() || "0"}
            </div>
            <div className="text-sm text-purple-100">Per NFT Per Day</div>
          </div>
        </div>

        {/* Staking Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Unstaked NFTs */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your NFTs (Unstaked)
            </h2>
            <p className="text-gray-600 mb-6">Select NFTs to stake</p>

            {unstakedTokens.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4 max-h-[500px] overflow-y-auto">
                  {unstakedTokens.map((tokenId) => (
                    <StakingNFTCard
                      key={tokenId.toString()}
                      tokenId={tokenId}
                      isSelected={selectedUnstaked.has(tokenId)}
                      onSelect={() => handleSelectUnstaked(tokenId)}
                    />
                  ))}
                </div>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSelectedUnstaked(new Set(unstakedTokens))}
                    className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedUnstaked(new Set())}
                    className="flex-1 bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Clear
                  </button>
                </div>
                <button
                  onClick={handleApproveAndStake}
                  disabled={
                    selectedUnstaked.size === 0 || isApproving || isStaking
                  }
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isApproving
                    ? "Approving..."
                    : isStaking
                    ? "Staking..."
                    : `Stake ${selectedUnstaked.size} NFTs`}
                </button>
              </>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
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
                <p className="text-gray-600">No unstaked NFTs</p>
              </div>
            )}
          </div>

          {/* Staked NFTs */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Staked NFTs
            </h2>
            <p className="text-gray-600 mb-6">Select NFTs to unstake</p>

            {stakedTokenIds && stakedTokenIds.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-4 mb-4 max-h-[500px] overflow-y-auto">
                  {stakedTokenIds.map((tokenId) => (
                    <StakingNFTCard
                      key={tokenId.toString()}
                      tokenId={tokenId}
                      isSelected={selectedStaked.has(tokenId)}
                      onSelect={() => handleSelectStaked(tokenId)}
                      isStaked
                    />
                  ))}
                </div>
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSelectedStaked(new Set(stakedTokenIds))}
                    className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedStaked(new Set())}
                    className="flex-1 bg-gray-100 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleWithdraw}
                    disabled={selectedStaked.size === 0 || isWithdrawing}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50"
                  >
                    {isWithdrawing
                      ? "Withdrawing..."
                      : `Withdraw ${selectedStaked.size}`}
                  </button>
                  <button
                    onClick={handleEmergencyUnstake}
                    disabled={selectedStaked.size === 0 || isEmergencyUnstaking}
                    className="bg-red-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 text-sm"
                    title="Emergency unstake (forfeit rewards)"
                  >
                    Emergency
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <p className="text-gray-600">No staked NFTs</p>
                <p className="text-sm text-gray-500 mt-2">
                  Stake NFTs to start earning rewards
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex">
            <svg
              className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">How Staking Works:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Select NFTs and approve the staking contract</li>
                <li>Rewards accumulate automatically based on reward rate</li>
                <li>Claim rewards anytime without unstaking</li>
                <li>Withdraw NFTs back (rewards auto-claimed)</li>
                <li>Emergency unstake forfeits pending rewards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StakingNFTCardProps {
  tokenId: bigint;
  isSelected: boolean;
  onSelect: () => void;
  isStaked?: boolean;
}

function StakingNFTCard({
  tokenId,
  isSelected,
  onSelect,
  isStaked,
}: StakingNFTCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
        isSelected
          ? "ring-4 ring-blue-500 scale-105"
          : "ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-300"
      }`}
    >
      <div className="relative aspect-square bg-gradient-to-br from-blue-100 to-purple-100">
        <Image
          src="/images/placeholder.png"
          alt={`NFT #${tokenId.toString()}`}
          fill
          className="object-cover"
        />
        {isStaked && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Staked
          </div>
        )}
        {isSelected && (
          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
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
      </div>
      <div className="p-2 bg-white">
        <p className="text-sm font-semibold text-center">
          #{tokenId.toString()}
        </p>
      </div>
    </div>
  );
}
