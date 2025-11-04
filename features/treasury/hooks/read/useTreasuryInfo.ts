"use client";

import { useQuery } from "@tanstack/react-query";
import { TreasuryVaultReadService } from "@/lib/services/treasury/readTreasuryVaultService";

const treasuryVaultReadService = new TreasuryVaultReadService();

export const useTreasuryVersion = () =>
  useQuery({
    queryKey: ["treasuryVersion"],
    queryFn: async () => await treasuryVaultReadService.getVersion(),
  });

export const useTreasuryOwner = () =>
  useQuery({
    queryKey: ["treasuryOwner"],
    queryFn: async () => await treasuryVaultReadService.getOwner(),
  });