"use client";

import { useAccount, useDisconnect } from "wagmi";

export const useWallet = () => {
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const walletType = connector?.name ?? "Unknown";

  return { address, isConnected, disconnect, walletType };
};
