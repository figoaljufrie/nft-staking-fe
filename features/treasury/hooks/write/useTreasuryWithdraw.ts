"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTreasuryVaultService } from "./useTreasuryService";

export const useWithdrawFunds = () => {
  const treasuryService = useTreasuryVaultService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ to, amount }: { to: `0x${string}`; amount: bigint }) => {
      const tx = await treasuryService.withdraw(to, amount);
      return tx;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treasury", "balance"] });
    },
  });
};