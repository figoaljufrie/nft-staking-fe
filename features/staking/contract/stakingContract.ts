import { stakingManager_ABI } from "@/lib/abis/staking/staking";
import { contractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import { walletClient } from "@/lib/clients/walletClient";
import { getContract } from "viem";

export const stakingManagerReadContract = getContract({
  address: contractsAddress.stakingManager_Proxy as `0x${string}`,
  abi: stakingManager_ABI,
  client: publicClient,
});

export const stakingManagerWriteContract = walletClient
  ? getContract({
      address: contractsAddress.stakingManager_Proxy as `0x${string}`,
      abi: stakingManager_ABI,
      client: walletClient,
    })
  : undefined;
