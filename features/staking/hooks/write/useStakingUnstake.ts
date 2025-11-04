"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStakingManagerService } from "./useStakingService";

export const useEmergencyUnstake = () => {
  const stakingService = useStakingManagerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tokenIds: bigint[]) => {
      const tx = await stakingService.emergencyUnstake(tokenIds);
      return tx;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staking", "userStake"] });
      queryClient.invalidateQueries({ queryKey: ["staking", "pendingRewards"] });
    },
  });
};