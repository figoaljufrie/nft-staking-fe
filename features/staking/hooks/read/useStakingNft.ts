"use client";

import { useQuery } from "@tanstack/react-query";
import { StakingManagerReadService } from "@/lib/services/staking/readStakingService";

const stakingService = new StakingManagerReadService();

export const useNFTCollection = () =>
  useQuery({
    queryKey: ["nftCollection"],
    queryFn: () => stakingService.getNFTCollection(),
  });