import { getRewardTokenWriteContract } from "@/lib/contracts/reward/rewardTokenContract";
import { ensureWalletAndNetwork, ensureContractExists } from "@/lib/utils/checkUtils";
import { isValidAddress, isPositiveBigInt } from "@/lib/utils/validation";
import { type WalletClient, type PublicClient } from "viem";

export class RewardTokenWriteService {
  constructor(
    private walletClient: WalletClient | undefined,
    private publicClient: PublicClient
  ) {}

  approve = async (spender: `0x${string}`, value: bigint) => {
    if (!isValidAddress(spender)) throw new Error("Invalid spender address");
    if (!isPositiveBigInt(value)) throw new Error("Invalid value");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getRewardTokenWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.approve([spender, value]);
  };

  transfer = async (to: `0x${string}`, value: bigint) => {
    if (!isValidAddress(to)) throw new Error("Invalid recipient address");
    if (!isPositiveBigInt(value)) throw new Error("Invalid value");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getRewardTokenWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.transfer([to, value]);
  };

  transferFrom = async (
    from: `0x${string}`,
    to: `0x${string}`,
    value: bigint
  ) => {
    if (!isValidAddress(from)) throw new Error("Invalid sender address");
    if (!isValidAddress(to)) throw new Error("Invalid recipient address");
    if (!isPositiveBigInt(value)) throw new Error("Invalid value");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getRewardTokenWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.transferFrom([from, to, value]);
  };

  burn = async (value: bigint) => {
    if (!isPositiveBigInt(value)) throw new Error("Invalid value");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getRewardTokenWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.burn([value]);
  };

  burnFrom = async (account: `0x${string}`, value: bigint) => {
    if (!isValidAddress(account)) throw new Error("Invalid account address");
    if (!isPositiveBigInt(value)) throw new Error("Invalid value");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getRewardTokenWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.burnFrom([account, value]);
  };
}