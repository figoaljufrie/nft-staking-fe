"use client";

import { useQuery } from "@tanstack/react-query";
import { RewardTokenReadService } from "@/lib/services/reward/readRewardService";

const rewardTokenReadService = new RewardTokenReadService();

//get reward token name;
export const useRewardTokenName = () =>
  useQuery({
    queryKey: ["rewardTokenName"],
    queryFn: () => rewardTokenReadService.getName(),
  });

//get reward token symbol;
export const useRewardTokenSymbol = () =>
  useQuery({
    queryKey: ["rewardTokenSymbol"],
    queryFn: () => rewardTokenReadService.getSymbol(),
  });

//get reward token decimals;
export const useRewardTokenDecimals = () =>
  useQuery({
    queryKey: ["rewardTokenDecimals"],
    queryFn: () => rewardTokenReadService.getDecimals(),
  });
