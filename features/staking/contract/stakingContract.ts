import { stakingManager_ABI } from "@/lib/abis/staking/staking";
import { ContractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import {getContract} from "viem";

export const MyNFTContract = getContract({
  address: ContractsAddress.StakingManager_Proxy as `0x${string}`,
  abi: stakingManager_ABI,
  client: publicClient,
});
