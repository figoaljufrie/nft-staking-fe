"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNFTWriteService } from "./useNftWriteService";

export const useMintPublic = () => {
  const nftWriteService = useNFTWriteService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tokenURI,
      value,
    }: {
      tokenURI: string;
      value: bigint;
    }) => {
      const tx = await nftWriteService.mintPublic(tokenURI, value);
      return tx;
    },
    onSuccess: (tx) => {
      queryClient.invalidateQueries({ queryKey: ["nft", "totalSupply"] });
      queryClient.invalidateQueries({ queryKey: ["nft", "balance"] });
    },
  });
};
