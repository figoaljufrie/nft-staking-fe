import { stakingManager_ABI } from "@/lib/abis/staking/staking";
import { contractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import { getContract, type WalletClient } from "viem";

export const stakingManagerReadContract = getContract({
  address: contractsAddress.stakingManager_Proxy as `0x${string}`,
  abi: stakingManager_ABI,
  client: publicClient,
});

export const getStakingManagerWriteContract = (walletClient: WalletClient) => {
  return getContract({
    address: contractsAddress.stakingManager_Proxy as `0x${string}`,
    abi: stakingManager_ABI,
    client: walletClient,
  });
};