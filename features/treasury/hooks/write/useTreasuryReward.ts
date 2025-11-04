"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTreasuryVaultService } from "./useTreasuryService";

export const useSendReward = () => {
  const treasuryService = useTreasuryVaultService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ to, amount }: { to: `0x${string}`; amount: bigint }) => {
      const tx = await treasuryService.sendReward(to, amount);
      return tx;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treasury", "balance"] });
    },
  });
};