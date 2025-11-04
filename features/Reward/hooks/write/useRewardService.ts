"use client";

import { useMemo } from "react";
import { useWalletClient } from "wagmi";
import { publicClient } from "@/lib/clients/publicClient";
import { RewardTokenWriteService } from "@/lib/services/reward/writeRewardService";

export const useRewardTokenWriteService = () => {
  const { data: walletClient } = useWalletClient();
  return useMemo(() => new RewardTokenWriteService(walletClient, publicClient), [walletClient]);
};