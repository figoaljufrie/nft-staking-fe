"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRewardTokenWriteService } from "./useRewardService";

export const useBurn = () => {
  const service = useRewardTokenWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: bigint) => await service.burn(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rewardToken", "balanceOf"] });
    },
  });
};

export const useBurnFrom = () => {
  const service = useRewardTokenWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      account,
      value,
    }: {
      account: `0x${string}`;
      value: bigint;
    }) => await service.burnFrom(account, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rewardToken", "balanceOf"] });
    },
  });
};
