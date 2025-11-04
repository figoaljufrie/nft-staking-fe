"use client";

import { StakingManagerWriteService } from "@/lib/services/staking/writeStakingService";
import { useWalletClient } from "wagmi";
import { publicClient } from "@/lib/clients/publicClient";

export const useStakingManagerService = () => {
  const { data: walletClient } = useWalletClient();
  return new StakingManagerWriteService(walletClient, publicClient);
};