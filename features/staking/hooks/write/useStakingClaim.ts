"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStakingManagerService } from "./useStakingService";

export const useClaimRewards = () => {
  const stakingService = useStakingManagerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const tx = await stakingService.claimRewards();
      return tx;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staking", "userStake"] });
      queryClient.invalidateQueries({ queryKey: ["staking", "pendingRewards"] });
    },
  });
};