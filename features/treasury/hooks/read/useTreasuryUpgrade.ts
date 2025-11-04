"use client";

import { useQuery } from "@tanstack/react-query";
import { TreasuryVaultReadService } from "@/lib/services/treasury/readTreasuryVaultService";

const treasuryVaultReadService = new TreasuryVaultReadService();

export const useTreasuryUpgradeVersion = () =>
  useQuery({
    queryKey: ["treasuryUpgradeVersion"],
    queryFn: () => treasuryVaultReadService.getUpgradeInterfaceVersion(),
  });

export const useTreasuryProxiableUUID = () =>
  useQuery({
    queryKey: ["treasuryProxiableUUID"],
    queryFn: () => treasuryVaultReadService.getProxiableUUID(),
  });