"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRewardTokenWriteService } from "./useRewardService";

export const useApprove = () => {
  const service = useRewardTokenWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      spender,
      value,
    }: {
      spender: `0x${string}`;
      value: bigint;
    }) => await service.approve(spender, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rewardToken", "allowance"] });
      queryClient.invalidateQueries({ queryKey: ["rewardToken", "balanceOf"] });
    },
  });
};
