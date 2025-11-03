import { treasuryVault_ABI } from "@/lib/abis/treasury/vault";
import { contractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import { walletClient } from "@/lib/clients/walletClient";
import { getContract } from "viem";

export const treasuryVaultReadContract = getContract({
  address: contractsAddress.treasuryVault_Proxy as `0x${string}`,
  abi: treasuryVault_ABI,
  client: publicClient,
});

export const treasuryVaultWriteContract = walletClient
  ? getContract({
      address: contractsAddress.treasuryVault_Proxy as `0x${string}`,
      abi: treasuryVault_ABI,
      client: walletClient,
    })
  : undefined;
