"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits, isAddress } from "viem";

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

// Components
import DashboardLayout from "@/components/dashboard/layout/dashboardLayout";
import AssetsHeader from "@/components/assets/section/header/assetsHeader";
import BalanceCards from "@/components/assets/section/balance/assetsBalance";
import NFTCollection from "@/components/collection/collection/nftCol";
import TransferModal from "@/components/assets/section/modal/transferModal";
import BurnModal from "@/components/assets/section/modal/burnModal";

export default function AssetsContainer() {
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

  if (nftsLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <p className="text-xl text-green-600 font-mono font-bold">
              LOADING_ASSETS...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const balanceData = {
    nftBalance: nftBalance?.toString() || "0",
    rewardBalance:
      rewardBalance && rewardDecimals
        ? parseFloat(formatUnits(rewardBalance, rewardDecimals)).toFixed(2)
        : "0.00",
    rewardSymbol: rewardSymbol || "Reward Token",
  };

  return (
    <DashboardLayout>
      <AssetsHeader address={address} isConnected={isConnected} />

      <BalanceCards data={balanceData} />

      <NFTCollection
        nftTokenIds={nftTokenIds}
        onTransfer={(tokenId) => {
          setSelectedTokenId(tokenId);
          setTransferModal(true);
        }}
        onBurn={(tokenId) => {
          setSelectedTokenId(tokenId);
          setBurnModal(true);
        }}
      />

      {transferModal && (
        <TransferModal
          selectedTokenId={selectedTokenId}
          transferAddress={transferAddress}
          setTransferAddress={setTransferAddress}
          isTransferring={isTransferring}
          onClose={() => !isTransferring && setTransferModal(false)}
          onTransfer={handleTransfer}
        />
      )}

      {burnModal && (
        <BurnModal
          selectedTokenId={selectedTokenId}
          isBurning={isBurning}
          onClose={() => !isBurning && setBurnModal(false)}
          onBurn={handleBurn}
        />
      )}
    </DashboardLayout>
  );
}
