import { treasuryVault_ABI } from "@/lib/abis/treasury/vault";
import { ContractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import {getContract} from "viem";

export const MyNFTContract = getContract({
  address: ContractsAddress.TreasuryVault_Proxy as `0x${string}`,
  abi: treasuryVault_ABI,
  client: publicClient,
});
