"use client";

import { useQuery } from "@tanstack/react-query";
import { NFTReadService } from "@/lib/services/nft/readNFTService";

const nftReadService = new NFTReadService();

// Get NFT name;
export const useNFTName = () =>
  useQuery({
    queryKey: ["nftName"],
    queryFn: () => nftReadService.getName(),
  });

//  Get NFT symbol;
export const useNFTSymbol = () =>
  useQuery({
    queryKey: ["nftSymbol"],
    queryFn: () => nftReadService.getSymbol(),
  });

//  Get total supply;
export const useTotalSupply = () =>
  useQuery({
    queryKey: ["nftTotalSupply"],
    queryFn: () => nftReadService.getTotalSupply(),
  });

// Get max supply;
export const useMaxSupply = () =>
  useQuery({
    queryKey: ["nftMaxSupply"],
    queryFn: () => nftReadService.getMaxSupply(),
  });
