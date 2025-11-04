import { useWalletClient } from "wagmi";
import { NFTWriteService } from "@/lib/services/nft/writeNFTService";
import { publicClient } from "@/lib/clients/publicClient";

export const useNFTWriteService = () => {
  const { data: walletClient } = useWalletClient();
  return new NFTWriteService(walletClient, publicClient);
};