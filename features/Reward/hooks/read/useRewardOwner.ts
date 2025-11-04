"use client";

import { useQuery } from "@tanstack/react-query";
import { RewardTokenReadService } from "@/lib/services/reward/readRewardService";

const rewardTokenReadService = new RewardTokenReadService();

// get owner;
export const useOwner = () =>
  useQuery({
    queryKey: ["rewardTokenOwner"],
    queryFn: () => rewardTokenReadService.getOwner(),
  });

  //get staking manager;
export const useStakingManager = () =>
  useQuery({
    queryKey: ["stakingManager"],
    queryFn: () => rewardTokenReadService.getStakingManager(),
  });
