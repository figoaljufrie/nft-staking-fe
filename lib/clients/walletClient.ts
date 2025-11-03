import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";

export const walletClient =
  typeof window !== "undefined" && window.ethereum
    ? createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      })
    : undefined;
