"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTreasuryVaultService } from "./useTreasuryService";

export const useDepositFunds = () => {
  const treasuryService = useTreasuryVaultService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: bigint) => {
      const tx = await treasuryService.depositFunds(amount);
      return tx;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treasury", "balance"] });
    },
  });
};