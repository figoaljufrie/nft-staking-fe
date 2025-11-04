"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStakingManagerService } from "./useStakingService";

export const useWithdraw = () => {
  const stakingService = useStakingManagerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tokenIds: bigint[]) => {
      const tx = await stakingService.withdraw(tokenIds);
      return tx;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staking", "userStake"] });
      queryClient.invalidateQueries({
        queryKey: ["staking", "pendingRewards"],
      });
    },
  });
};
