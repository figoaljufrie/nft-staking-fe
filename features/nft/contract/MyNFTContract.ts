import { MyNFT_ABI } from "@/lib/abis/nft/myNFT";
import { ContractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import {getContract} from "viem";

export const MyNFTContract = getContract({
  address: ContractsAddress.MyNFT_Proxy as `0x${string}`,
  abi: MyNFT_ABI,
  client: publicClient,
});
