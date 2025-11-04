"use client";

import { useQuery } from "@tanstack/react-query";
import { NFTReadService } from "@/lib/services/nft/readNFTService";

const nftReadService = new NFTReadService();

// Get Mint Price;
export const useMintPrice = () =>
  useQuery({
    queryKey: ["nftMintPrice"],
    queryFn: () => nftReadService.getMintPrice(),
  });

// Get Available NFTs with Metadata;
export const useAvailableNFTs = () =>
  useQuery({
    queryKey: ["availableNFTs"],
    queryFn: () => nftReadService.getAvailableNFTWithMetadata(),
  });
