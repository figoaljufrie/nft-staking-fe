"use client";

import { useQuery } from "@tanstack/react-query";
import { StakingManagerReadService } from "@/lib/services/staking/readStakingService";

const stakingService = new StakingManagerReadService();

//get reward rate;
export const useRewardRate = () =>
  useQuery({
    queryKey: ["rewardRate"],
    queryFn: () => stakingService.getRewardRate(),
  });

  //get reward token;
export const useRewardToken = () =>
  useQuery({
    queryKey: ["rewardToken"],
    queryFn: () => stakingService.getRewardToken(),
  });