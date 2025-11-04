"use client";

import { useQuery } from "@tanstack/react-query";
import { RewardTokenReadService } from "@/lib/services/reward/readRewardService";

const rewardTokenReadService = new RewardTokenReadService();

//get paused state;
export const usePausedState = () =>
  useQuery({
    queryKey: ["pausedState"],
    queryFn: () => rewardTokenReadService.getPausedState(),
  });

  //get interface;
export const useUpgradeInterfaceVersion = () =>
  useQuery({
    queryKey: ["upgradeInterfaceVersion"],
    queryFn: () => rewardTokenReadService.getUpgradeInterfaceVersion(),
  });