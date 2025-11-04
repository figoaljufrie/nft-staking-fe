import { RewardToken_ABI } from "@/lib/abis/reward/reward";
import { contractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import { getContract, type WalletClient } from "viem";

export const rewardTokenReadContract = getContract({
  address: contractsAddress.rewardToken_Proxy as `0x${string}`,
  abi: RewardToken_ABI,
  client: publicClient,
});

export const getRewardTokenWriteContract = (walletClient: WalletClient) => {
  return getContract({
    address: contractsAddress.rewardToken_Proxy as `0x${string}`,
    abi: RewardToken_ABI,
    client: walletClient,
  });
};