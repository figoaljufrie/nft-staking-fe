"use client";

import { useQuery } from "@tanstack/react-query";
import { TreasuryVaultReadService } from "@/lib/services/treasury/readTreasuryVaultService";

const treasuryVaultReadService = new TreasuryVaultReadService();

export const useTreasuryBalance = () =>
  useQuery({
    queryKey: ["treasuryBalance"],
    queryFn: async () => await treasuryVaultReadService.getBalance(),
  });