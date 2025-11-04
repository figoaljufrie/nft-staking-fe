import { treasuryVault_ABI } from "@/lib/abis/treasury/vault";
import { contractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import { getContract, type WalletClient } from "viem";

export const treasuryVaultReadContract = getContract({
  address: contractsAddress.treasuryVault_Proxy as `0x${string}`,
  abi: treasuryVault_ABI,
  client: publicClient,
});

export const getTreasuryVaultWriteContract = (walletClient: WalletClient) => {
  return getContract({
    address: contractsAddress.treasuryVault_Proxy as `0x${string}`,
    abi: treasuryVault_ABI,
    client: walletClient,
  });
};