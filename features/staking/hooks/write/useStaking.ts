"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStakingManagerService } from "./useStakingService";

export const useStake = () => {
  const stakingService = useStakingManagerService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tokenIds: bigint[]) => {
      const tx = await stakingService.stake(tokenIds);
      return tx;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staking", "userStake"] });
    },
  });
};