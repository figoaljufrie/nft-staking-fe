"use client";

import { useQuery } from "@tanstack/react-query";
import { TreasuryVaultReadService } from "@/lib/services/treasury/readTreasuryVaultService";

const treasuryVaultReadService = new TreasuryVaultReadService();

export const useTreasuryPaused = () =>
  useQuery({
    queryKey: ["treasuryPaused"],
    queryFn: () => treasuryVaultReadService.isPaused(),
  });

export const useTreasuryRewardToken = () =>
  useQuery({
    queryKey: ["treasuryRewardToken"],
    queryFn: () => treasuryVaultReadService.getRewardToken(),
  });