"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNFTWriteService } from "./useNftWriteService";

export const useBurn = () => {
  const nftWriteService = useNFTWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tokenId: bigint) => nftWriteService.burn(tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nft", "balance"] });
      queryClient.invalidateQueries({ queryKey: ["nft", "tokens"] });
    },
  });
};
