"use client";

import { useQuery } from "@tanstack/react-query";
import { StakingManagerReadService } from "@/lib/services/staking/readStakingService";

const stakingService = new StakingManagerReadService();

export const useUpgradeInterfaceVersion = () =>
  useQuery({
    queryKey: ["staking", "upgradeInterfaceVersion"],
    queryFn: () => stakingService.getUpgradeInterfaceVersion(),
  });

export const useProxiableUUID = () =>
  useQuery({
    queryKey: ["staking", "proxiableUUID"],
    queryFn: () => stakingService.getProxiableUUID(),
  });
