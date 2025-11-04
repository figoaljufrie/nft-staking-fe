"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRewardTokenWriteService } from "./useRewardService";

export const useTransfer = () => {
  const service = useRewardTokenWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ to, value }: { to: `0x${string}`; value: bigint }) =>
      await service.transfer(to, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rewardToken", "balanceOf"] });
    },
  });
};

export const useTransferFrom = () => {
  const service = useRewardTokenWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      from,
      to,
      value,
    }: {
      from: `0x${string}`;
      to: `0x${string}`;
      value: bigint;
    }) => await service.transferFrom(from, to, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rewardToken", "balanceOf"] });
    },
  });
};
