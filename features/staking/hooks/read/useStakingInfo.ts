"use client";

import { useQuery } from "@tanstack/react-query";
import { StakingManagerReadService } from "@/lib/services/staking/readStakingService";

const stakingService = new StakingManagerReadService();

//get version;
export const useVersion = () =>
  useQuery({
    queryKey: ["stakingVersion"],
    queryFn: () => stakingService.getVersion(),
  });

  //get owner;
export const useOwner = () =>
  useQuery({
    queryKey: ["stakingOwner"],
    queryFn: () => stakingService.getOwner(),
  });

//get paused;
export const usePaused = () =>
  useQuery({
    queryKey: ["stakingPaused"],
    queryFn: () => stakingService.isPaused(),
  });