"use client";

import { useQuery } from "@tanstack/react-query";
import { RewardTokenReadService } from "@/lib/services/reward/readRewardService";

const rewardTokenReadService = new RewardTokenReadService();

// get allowance;
export const useAllowance = (owner?: `0x${string}`, spender?: `0x${string}`) =>
  useQuery({
    queryKey: ["rewardAllowance", owner, spender],
    queryFn: async () => {
      if (!owner || !spender)
        throw new Error("Missing owner or spender address");
      return await rewardTokenReadService.getAllowance(owner, spender);
    },
    enabled: !!owner && !!spender,
  });
