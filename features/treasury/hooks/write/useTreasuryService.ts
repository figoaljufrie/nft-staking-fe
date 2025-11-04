"use client";

import { TreasuryVaultWriteService } from "@/lib/services/treasury/writeTreasuryVaultService";
import { useWalletClient } from "wagmi";
import { publicClient } from "@/lib/clients/publicClient";

export const useTreasuryVaultService = () => {
  const { data: walletClient } = useWalletClient();
  return new TreasuryVaultWriteService(walletClient, publicClient);
};
