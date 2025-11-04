import { getStakingManagerWriteContract } from "@/lib/contracts/staking/stakingContract";
import { ensureWalletAndNetwork, ensureContractExists } from "@/lib/utils/checkUtils";
import { isPositiveBigIntArray, isValidTxHash } from "@/lib/utils/validation";
import { type WalletClient, type PublicClient } from "viem";

export class StakingManagerWriteService {
  constructor(
    private walletClient: WalletClient | undefined,
    private publicClient: PublicClient
  ) {}

  claimRewards = async (): Promise<`0x${string}`> => {
    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getStakingManagerWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    const txHash = await writeContract!.write.claimRewards();
    if (!isValidTxHash(txHash)) throw new Error("Invalid transaction hash");
    return txHash as `0x${string}`;
  };

  stake = async (tokenIds: bigint[]): Promise<`0x${string}`> => {
    if (!isPositiveBigIntArray(tokenIds))
      throw new Error("Invalid token IDs array");
    if (tokenIds.length === 0) throw new Error("No tokens provided");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getStakingManagerWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    const txHash = await writeContract!.write.stake([tokenIds]);
    if (!isValidTxHash(txHash)) throw new Error("Invalid transaction hash");
    return txHash as `0x${string}`;
  };

  withdraw = async (tokenIds: bigint[]): Promise<`0x${string}`> => {
    if (!isPositiveBigIntArray(tokenIds))
      throw new Error("Invalid token IDs array");
    if (tokenIds.length === 0) throw new Error("No tokens provided");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getStakingManagerWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    const txHash = await writeContract!.write.withdraw([tokenIds]);
    if (!isValidTxHash(txHash)) throw new Error("Invalid transaction hash");
    return txHash as `0x${string}`;
  };

  emergencyUnstake = async (tokenIds: bigint[]): Promise<`0x${string}`> => {
    if (!isPositiveBigIntArray(tokenIds))
      throw new Error("Invalid token IDs array");
    if (tokenIds.length === 0) throw new Error("No tokens provided");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getStakingManagerWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    const txHash = await writeContract!.write.emergencyUnstake([tokenIds]);
    if (!isValidTxHash(txHash)) throw new Error("Invalid transaction hash");
    return txHash as `0x${string}`;
  };
}