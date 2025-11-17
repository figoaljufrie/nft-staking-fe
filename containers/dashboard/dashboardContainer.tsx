"use client";

import { useAccount } from "wagmi";
import { formatEther, formatUnits } from "viem";
import { useState } from "react";

// NFT Hooks
import {
  useNFTName,
  useNFTSymbol,
  useTotalSupply as useNFTTotalSupply,
  useMaxSupply as useNFTMaxSupply,
} from "@/features/nft/hooks/read/useNftInfo";
import { useMintPrice } from "@/features/nft/hooks/read/useNftPrice";

// Reward Token Hooks
import {
  useRewardTokenName,
  useRewardTokenSymbol,
  useRewardTokenDecimals,
} from "@/features/Reward/hooks/read/useRewardInfo";
import {
  useTotalSupply as useRewardTotalSupply,
  useMaxSupply as useRewardMaxSupply,
} from "@/features/Reward/hooks/read/useRewardSupply";

// Staking Hooks
import { useVersion as useStakingVersion } from "@/features/staking/hooks/read/useStakingInfo";
import { useRewardRate } from "@/features/staking/hooks/read/useStakingRewards";

// Treasury Hooks
import { useTreasuryBalance } from "@/features/treasury/hooks/read/useTreasuryBalance";

// Components
import DashboardLayout from "@/components/dashboard/layout/dashboardLayout";
import DashboardHeader from "@/components/ui/dashboardHeader";
import OverviewCard from "@/components/dashboard/section/overview/overviewSection";
import QuickActionsCard from "@/components/dashboard/section/quick-actions/quickActionSection";
import InfoSection from "@/components/dashboard/section/info-card/infoCardSection";

export default function DashboardContainer() {
  const { address, isConnected } = useAccount();
  const [timeRange, setTimeRange] = useState("7d");

  // NFT Data
  const { data: nftName } = useNFTName();
  const { data: nftSymbol } = useNFTSymbol();
  const { data: nftTotalSupply } = useNFTTotalSupply();
  const { data: nftMaxSupply } = useNFTMaxSupply();
  const { data: mintPrice } = useMintPrice();

  // Reward Token Data
  const { data: rewardName } = useRewardTokenName();
  const { data: rewardSymbol } = useRewardTokenSymbol();
  const { data: rewardDecimals } = useRewardTokenDecimals();
  const { data: rewardTotalSupply } = useRewardTotalSupply();
  const { data: rewardMaxSupply } = useRewardMaxSupply();

  // Staking Data
  const { data: rewardRate } = useRewardRate();
  const { data: stakingVersion } = useStakingVersion();

  // Treasury Data
  const { data: treasuryBalance } = useTreasuryBalance();

  // Consolidated data
  const overviewData = {
    nft: {
      name: nftName || "Loading...",
      symbol: nftSymbol || "Loading...",
      minted: nftTotalSupply?.toString() || "0",
      maxSupply: nftMaxSupply?.toString() || "0",
      mintPrice: mintPrice ? formatEther(mintPrice) : "0",
    },
    reward: {
      name: rewardName || "Loading...",
      symbol: rewardSymbol || "Loading...",
      totalSupply:
        rewardTotalSupply && rewardDecimals
          ? parseFloat(formatUnits(rewardTotalSupply, rewardDecimals)).toLocaleString()
          : "0",
      maxSupply:
        rewardMaxSupply && rewardDecimals
          ? parseFloat(formatUnits(rewardMaxSupply, rewardDecimals)).toLocaleString()
          : "0",
    },
    staking: {
      rewardRate: rewardRate?.toString() || "0",
      version: stakingVersion || "Loading...",
      treasuryBalance:
        treasuryBalance && rewardDecimals
          ? parseFloat(formatUnits(treasuryBalance, rewardDecimals)).toLocaleString()
          : "0",
      rewardSymbol: rewardSymbol || "",
    },
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        address={address}
        isConnected={isConnected}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <OverviewCard data={overviewData} />
        <QuickActionsCard />
      </div>

      <InfoSection
        address={address}
        isConnected={isConnected}
        nftSymbol={nftSymbol || "Loading..."}
        rewardSymbol={rewardSymbol || "Loading..."}
      />
    </DashboardLayout>
  );
}