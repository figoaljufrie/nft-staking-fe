import { type WalletClient, type PublicClient } from "viem";

const EXPECTED_CHAIN_ID = 11155111;

export const ensureWalletAndNetwork = async (
  walletClient: WalletClient | undefined,
  publicClient: PublicClient,
  valueToSend?: bigint
) => {
  if (!walletClient) throw new Error("Wallet not detected");

  const accounts = await walletClient.getAddresses();
  if (!accounts?.length) throw new Error("Wallet not connected");
  const userAddress = accounts[0];

  const chainId = await walletClient.getChainId();
  if (chainId !== EXPECTED_CHAIN_ID) throw new Error("Wallet on wrong network");

  if (valueToSend !== undefined) {
    const balance = await publicClient.getBalance({ address: userAddress });
    if (balance < valueToSend) throw new Error("Insufficient wallet balance");
  }

  return userAddress;
};

export const ensureContractExists = (contract: any) => {
  if (!contract?.write) throw new Error("Write contract not initialized");
};