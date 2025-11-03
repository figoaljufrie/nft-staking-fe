import { MyNFT_ABI } from "@/lib/abis/nft/myNFT";
import { contractsAddress } from "@/lib/address/addresses";
import { publicClient } from "@/lib/clients/publicClient";
import { walletClient } from "@/lib/clients/walletClient";
import { getContract } from "viem";

export const myNFTReadContract = getContract({
  address: contractsAddress.myNFT_Proxy as `0x${string}`,
  abi: MyNFT_ABI,
  client: publicClient,
});

export const myNFTWriteContract = walletClient
  ? getContract({
      address: contractsAddress.myNFT_Proxy as `0x${string}`,
      abi: MyNFT_ABI,
      client: walletClient,
    })
  : undefined;
