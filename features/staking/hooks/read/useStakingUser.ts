"use client";

import { useQuery } from "@tanstack/react-query";
import { StakingManagerReadService } from "@/lib/services/staking/readStakingService";

const stakingService = new StakingManagerReadService();

export const useUserStakeInfo = (user?: `0x${string}`) =>
  useQuery({
    queryKey: ["staking", "userStakeInfo", user],
    queryFn: () => stakingService.getUserStakeInfo(user!),
    enabled: !!user,
  });

export const useFullStake = (user?: `0x${string}`) =>
  useQuery({
    queryKey: ["staking", "fullStake", user],
    queryFn: () => stakingService.getFullStake(user!),
    enabled: !!user,
  });

export const useStakedTokens = (user?: `0x${string}`) =>
  useQuery({
    queryKey: ["staking", "stakedTokens", user],
    queryFn: () => stakingService.getStakedTokens(user!),
    enabled: !!user,
  });

export const useTokenIndex = (user?: `0x${string}`, tokenId?: bigint) =>
  useQuery({
    queryKey: ["staking", "tokenIndex", user, tokenId?.toString()],
    queryFn: () => stakingService.getTokenIndex(user!, tokenId!),
    enabled: !!user && tokenId !== undefined,
  });

export const usePendingRewards = (user?: `0x${string}`) =>
  useQuery({
    queryKey: ["staking", "pendingRewards", user],
    queryFn: () => stakingService.pendingRewards(user!),
    enabled: !!user,
  });
