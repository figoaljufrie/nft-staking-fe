import { createWalletClient, custom, type WalletClient } from "viem";
import { sepolia } from "viem/chains";

export const getWalletClient = (): WalletClient | undefined => {
  if (typeof window === "undefined" || !window.ethereum) return undefined;
  
  return createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
  });
};