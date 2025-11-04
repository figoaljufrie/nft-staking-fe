"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNFTWriteService } from "./useNftWriteService";

export const useTransferFrom = () => {
  const nftWriteService = useNFTWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ from, to, tokenId }: { from: `0x${string}`; to: `0x${string}`; tokenId: bigint }) =>
      await nftWriteService.transferFrom(from, to, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nft", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["nft", "ownerOf"] });
    },
  });
};

export const useSafeTransferFrom = () => {
  const nftWriteService = useNFTWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ from, to, tokenId, data }: { from: `0x${string}`; to: `0x${string}`; tokenId: bigint; data?: string }) =>
      await nftWriteService.safeTransferFrom(from, to, tokenId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nft", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["nft", "ownerOf"] });
    },
  });
};