import { RewardToken_ABI } from "@/lib/abis/reward/reward";
import { ContractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import { getContract } from "viem";

export const MyNFTContract = getContract({
  address: ContractsAddress.RewardToken_Proxy as `0x${string}`,
  abi: RewardToken_ABI,
  client: publicClient,
});
