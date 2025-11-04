"use client";

import { useQuery } from "@tanstack/react-query";
import { NFTReadService } from "@/lib/services/nft/readNFTService";

const nftReadService = new NFTReadService();

// Get Contract Owner;
export const useOwner = () =>
  useQuery({
    queryKey: ["nftOwner"],
    queryFn: () => nftReadService.getOwner(),
  });

// Get Owner of Specific Token;
export const useOwnerOfToken = (tokenId?: bigint) =>
  useQuery({
    queryKey: ["nftOwnerOfToken", tokenId],
    queryFn: () => nftReadService.getOwnerOf(tokenId!),
    enabled: tokenId !== undefined,
  });

// Get Token URI;
export const useTokenURI = (tokenId?: bigint) =>
  useQuery({
    queryKey: ["nftTokenURI", tokenId],
    queryFn: () => nftReadService.getTokenURI(tokenId!),
    enabled: tokenId !== undefined,
  });

// Get Balance of an Owner;
export const useBalanceOf = (ownerAddress?: `0x${string}`) =>
  useQuery({
    queryKey: ["nftBalanceOf", ownerAddress],
    queryFn: () => nftReadService.getBalanceOf(ownerAddress!),
    enabled: !!ownerAddress,
  });

// Get Token by Owner and Index;
export const useTokensOfOwnerByIndex = (
  ownerAddress?: `0x${string}`,
  index?: bigint
) =>
  useQuery({
    queryKey: ["nftTokensOfOwnerByIndex", ownerAddress, index],
    queryFn: () =>
      nftReadService.getTokensOfOwnerByIndex(ownerAddress!, index!),
    enabled: !!ownerAddress && index !== undefined,
  });

// Get All Tokens Owned by an Address;
export const useAllTokensOfOwner = (ownerAddress?: `0x${string}`) =>
  useQuery({
    queryKey: ["nftAllTokensOfOwner", ownerAddress],
    queryFn: () => nftReadService.getAllTokensOfOwner(ownerAddress!),
    enabled: !!ownerAddress,
  });
