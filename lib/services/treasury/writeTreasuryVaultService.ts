import { getTreasuryVaultWriteContract } from "@/lib/contracts/treasury/treasuryVaultContract";
import { ensureWalletAndNetwork, ensureContractExists } from "@/lib/utils/checkUtils";
import { isValidAddress, isPositiveBigInt } from "@/lib/utils/validation";
import { type WalletClient, type PublicClient } from "viem";

export class TreasuryVaultWriteService {
  constructor(
    private walletClient: WalletClient | undefined,
    private publicClient: PublicClient
  ) {}

  depositFunds = async (amount: bigint) => {
    if (!isPositiveBigInt(amount)) throw new Error("Invalid deposit amount");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getTreasuryVaultWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.depositFunds([amount]);
  };

  withdraw = async (to: `0x${string}`, amount: bigint) => {
    if (!isValidAddress(to)) throw new Error("Invalid recipient address");
    if (!isPositiveBigInt(amount)) throw new Error("Invalid withdrawal amount");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getTreasuryVaultWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.withdraw([to, amount]);
  };

  sendReward = async (to: `0x${string}`, amount: bigint) => {
    if (!isValidAddress(to)) throw new Error("Invalid recipient address");
    if (!isPositiveBigInt(amount)) throw new Error("Invalid reward amount");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);
    
    const writeContract = this.walletClient
      ? getTreasuryVaultWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.sendReward([to, amount]);
  };
}