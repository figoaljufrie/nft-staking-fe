"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNFTWriteService } from "./useNftWriteService";

export const useApprove = () => {
  const nftWriteService = useNFTWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      to,
      tokenId,
    }: {
      to: `0x${string}`;
      tokenId: bigint;
    }) => nftWriteService.approve(to, tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nft", "approval"] });
      queryClient.invalidateQueries({ queryKey: ["nft", "balance"] });
    },
  });
};

export const useSetApprovalForAll = () => {
  const nftWriteService = useNFTWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      operator,
      approved,
    }: {
      operator: `0x${string}`;
      approved: boolean;
    }) => nftWriteService.setApprovalForAll(operator, approved),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nft", "approvalForAll"] });
      queryClient.invalidateQueries({ queryKey: ["nft", "balance"] });
    },
  });
};
