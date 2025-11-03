// lib/services/stakingManagerWriteService.ts
import { stakingManagerWriteContract } from "../contract/stakingContract";

function ensureWriteContract() {
  if (!stakingManagerWriteContract) {
    throw new Error("Wallet not connected or write contract unavailable.");
  }
  return stakingManagerWriteContract;
}

export class StakingManagerWriteService {
  // === User-visible state-changing actions ===

  claimRewards = async (): Promise<`0x${string}`> => {
    const contract = ensureWriteContract();
    const txHash = await contract.write.claimRewards();
    return txHash as `0x${string}`;
  };

  stake = async (tokenIds: bigint[]): Promise<`0x${string}`> => {
    const contract = ensureWriteContract();
    const txHash = await contract.write.stake([tokenIds]);
    return txHash as `0x${string}`;
  };

  withdraw = async (tokenIds: bigint[]): Promise<`0x${string}`> => {
    const contract = ensureWriteContract();
    const txHash = await contract.write.withdraw([tokenIds]);
    return txHash as `0x${string}`;
  };

  emergencyUnstake = async (tokenIds: bigint[]): Promise<`0x${string}`> => {
    const contract = ensureWriteContract();
    const txHash = await contract.write.emergencyUnstake([tokenIds]);
    return txHash as `0x${string}`;
  };
}