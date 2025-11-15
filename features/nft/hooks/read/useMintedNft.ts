// features/nft/hooks/read/useMintedNFTs.ts
import { useQuery } from "@tanstack/react-query";
import { NFTReadService } from "@/lib/services/nft/readNFTService";
export const useMintedNFTs = (page: number = 0, limit: number = 20) => {
  const nftReadService = new NFTReadService();

  return useQuery({
    queryKey: ["minted-nfts", page],
    queryFn: () => nftReadService.getMintedNFTs(page * limit, limit),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
