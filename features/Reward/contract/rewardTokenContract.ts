import { RewardToken_ABI } from "@/lib/abis/reward/reward";
import { contractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import { walletClient } from "@/lib/clients/walletClient";
import { getContract } from "viem";

export const rewardTokenReadContract = getContract({
  address: contractsAddress.rewardToken_Proxy as `0x${string}`,
  abi: RewardToken_ABI,
  client: publicClient,
});

export const rewardTokenWriteContract = walletClient
  ? getContract({
      address: contractsAddress.rewardToken_Proxy as `0x${string}`,
      abi: RewardToken_ABI,
      client: walletClient,
    })
  : undefined;
