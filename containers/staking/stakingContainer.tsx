"use client";

import { useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

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

// Components
import DashboardLayout from "@/components/dashboard/layout/dashboardLayout";
import StakingHeader from "@/components/staking/header/stakingHeader";
import RewardsPanel from "@/components/staking/reward/rewardPanel";
import StakingInterface from "@/components/staking/interface/stakingInterface";
import StakingInfo from "@/components/staking/info/stakingInfo";

export default function StakingContainer() {
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

  // Get staking contract address
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

  if (tokensLoading || stakedLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <p className="text-xl text-green-600 font-mono font-bold">
              LOADING_STAKING_DATA...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const rewardsData = {
    pendingRewards:
      pendingRewards && rewardDecimals
        ? parseFloat(formatUnits(pendingRewards, rewardDecimals)).toFixed(4)
        : "0.0000",
    stakedCount: stakedTokenIds?.length || 0,
    rewardRate: rewardRate?.toString() || "0",
    rewardSymbol: rewardSymbol || "Tokens",
    canClaim: pendingRewards && pendingRewards > 0n,
  };

  return (
    <DashboardLayout>
      <StakingHeader address={address} isConnected={isConnected} />

      <RewardsPanel
        data={rewardsData}
        isClaiming={isClaiming}
        onClaimRewards={handleClaimRewards}
      />

      <StakingInterface
        unstakedTokens={unstakedTokens}
        stakedTokenIds={stakedTokenIds || []}
        selectedUnstaked={selectedUnstaked}
        selectedStaked={selectedStaked}
        isApproving={isApproving}
        isStaking={isStaking}
        isWithdrawing={isWithdrawing}
        isEmergencyUnstaking={isEmergencyUnstaking}
        onSelectUnstaked={handleSelectUnstaked}
        onSelectStaked={handleSelectStaked}
        onSelectAllUnstaked={() => setSelectedUnstaked(new Set(unstakedTokens))}
        onClearUnstaked={() => setSelectedUnstaked(new Set())}
        onSelectAllStaked={() => setSelectedStaked(new Set(stakedTokenIds))}
        onClearStaked={() => setSelectedStaked(new Set())}
        onApproveAndStake={handleApproveAndStake}
        onWithdraw={handleWithdraw}
        onEmergencyUnstake={handleEmergencyUnstake}
      />

      <StakingInfo />
    </DashboardLayout>
  );
}
