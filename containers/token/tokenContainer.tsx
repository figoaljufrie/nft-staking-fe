"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits, parseUnits, isAddress } from "viem";

// Layout
import DashboardLayout from "@/components/dashboard/layout/dashboardLayout";

// Token Hooks
import { useBalanceOf } from "@/features/Reward/hooks/read/useRewardSupply";
import {
  useRewardTokenName,
  useRewardTokenDecimals,
  useRewardTokenSymbol,
} from "@/features/Reward/hooks/read/useRewardInfo";
import { useAllowance } from "@/features/Reward/hooks/read/useRewardAllowance";
import { useTransfer } from "@/features/Reward/hooks/write/useRewardTransfer";
import { useApprove } from "@/features/Reward/hooks/write/useRewardApprove";
import { useBurn } from "@/features/Reward/hooks/write/useRewardBurn";

// Components
import TokensHeader from "@/components/token/section/header/tokenHeader";
import TokenInfoCard from "@/components/token/section/info/tokenInfoCard";
import TransferSection from "@/components/token/section/transfer/tokenTransfer";
import ApprovalSection from "@/components/token/section/approval/tokenApproval";
import CheckAllowanceSection from "@/components/token/section/allowance/checkAllowance";
import BurnSection from "@/components/token/section/burn/tokenBurn";
import TokenGuideSection from "@/components/token/section/guide/tokenGuide";

export default function TokensContainer() {
  const { address, isConnected } = useAccount();

  // Token Info
  const { data: tokenName } = useRewardTokenName();
  const { data: symbol } = useRewardTokenSymbol();
  const { data: decimals } = useRewardTokenDecimals();
  const { data: balance, isLoading: balanceLoading } = useBalanceOf(address);

  // Write hooks
  const transfer = useTransfer();
  const approve = useApprove();
  const burn = useBurn();

  // Transfer State
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  // Approval State
  const [approvalSpender, setApprovalSpender] = useState("");
  const [approvalAmount, setApprovalAmount] = useState("");
  const [isApproving, setIsApproving] = useState(false);

  // Check Allowance State
  const [checkSpender, setCheckSpender] = useState("");
  const { data: allowanceData } = useAllowance(
    address,
    isAddress(checkSpender) ? (checkSpender as `0x${string}`) : undefined
  );

  // Burn State
  const [burnAmount, setBurnAmount] = useState("");
  const [isBurning, setIsBurning] = useState(false);

  const handleTransfer = async () => {
    if (!transferTo || !transferAmount || !decimals || !isAddress(transferTo))
      return;

    setIsTransferring(true);
    try {
      const amount = parseUnits(transferAmount, decimals);
      await transfer.mutateAsync({
        to: transferTo as `0x${string}`,
        value: amount,
      });

      setTransferTo("");
      setTransferAmount("");
      alert("Transfer successful!");
    } catch (error: any) {
      console.error("Transfer failed:", error);
      alert(error.message || "Transfer failed");
    } finally {
      setIsTransferring(false);
    }
  };

  const handleApprove = async () => {
    if (
      !approvalSpender ||
      !approvalAmount ||
      !decimals ||
      !isAddress(approvalSpender)
    )
      return;

    setIsApproving(true);
    try {
      const amount = parseUnits(approvalAmount, decimals);
      await approve.mutateAsync({
        spender: approvalSpender as `0x${string}`,
        value: amount,
      });

      setApprovalSpender("");
      setApprovalAmount("");
      alert("Approval successful!");
    } catch (error: any) {
      console.error("Approval failed:", error);
      alert(error.message || "Approval failed");
    } finally {
      setIsApproving(false);
    }
  };

  const handleBurn = async () => {
    if (!burnAmount || !decimals) return;
    if (
      !confirm(
        "Are you sure you want to burn these tokens? This action cannot be undone."
      )
    )
      return;

    setIsBurning(true);
    try {
      const amount = parseUnits(burnAmount, decimals);
      await burn.mutateAsync(amount);

      setBurnAmount("");
      alert("Tokens burned successfully!");
    } catch (error: any) {
      console.error("Burn failed:", error);
      alert(error.message || "Burn failed");
    } finally {
      setIsBurning(false);
    }
  };

  const setMaxTransfer = () => {
    if (balance && decimals) {
      setTransferAmount(formatUnits(balance, decimals));
    }
  };

  const setMaxBurn = () => {
    if (balance && decimals) {
      setBurnAmount(formatUnits(balance, decimals));
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-12">
        <TokensHeader isConnected={isConnected} />

        <TokenInfoCard
          balance={balance}
          decimals={decimals}
          symbol={symbol}
          tokenName={tokenName}
          balanceLoading={balanceLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <TransferSection
            transferTo={transferTo}
            setTransferTo={setTransferTo}
            transferAmount={transferAmount}
            setTransferAmount={setTransferAmount}
            isTransferring={isTransferring}
            handleTransfer={handleTransfer}
            setMaxTransfer={setMaxTransfer}
            balance={balance}
            decimals={decimals}
            symbol={symbol}
          />

          <ApprovalSection
            approvalSpender={approvalSpender}
            setApprovalSpender={setApprovalSpender}
            approvalAmount={approvalAmount}
            setApprovalAmount={setApprovalAmount}
            isApproving={isApproving}
            handleApprove={handleApprove}
            symbol={symbol}
          />
        </div>

        <CheckAllowanceSection
          checkSpender={checkSpender}
          setCheckSpender={setCheckSpender}
          allowanceData={allowanceData}
          decimals={decimals}
          symbol={symbol}
          address={address}
        />

        <BurnSection
          burnAmount={burnAmount}
          setBurnAmount={setBurnAmount}
          isBurning={isBurning}
          handleBurn={handleBurn}
          setMaxBurn={setMaxBurn}
          balance={balance}
          decimals={decimals}
          symbol={symbol}
        />

        <TokenGuideSection />
      </div>
    </DashboardLayout>
  );
}
