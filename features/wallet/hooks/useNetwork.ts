import { useAccount } from "wagmi";

export const useNetworkStatus = (supportedChains: number[] = [1, 5, 137]) => {
  const { chain } = useAccount();

  const chainId = chain?.id ?? 0;
  const networkName = chain?.name ?? "unknown";
  const isSupported = chainId ? supportedChains.includes(chainId) : false;

  return { chainId, networkName, isSupported };
};
