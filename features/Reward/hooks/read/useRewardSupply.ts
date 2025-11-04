"use client";

import { useQuery } from "@tanstack/react-query";
import { RewardTokenReadService } from "@/lib/services/reward/readRewardService";

const rewardTokenReadService = new RewardTokenReadService();

//get total suplly;
export const useTotalSupply = () =>
  useQuery({
    queryKey: ["totalSupply"],
    queryFn: () => rewardTokenReadService.getTotalSupply(),
  });

  //get owner balance;
export const useBalanceOf = (account?: string) =>
  useQuery({
    queryKey: ["balanceOf", account],
    queryFn: () => rewardTokenReadService.getBalanceOf(account!),
    enabled: !!account,
  });

  //get max supply;
export const useMaxSupply = () =>
  useQuery({
    queryKey: ["maxSupply"],
    queryFn: () => rewardTokenReadService.getMaxSupply(),
  });