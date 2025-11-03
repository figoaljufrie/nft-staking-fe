import { treasuryVaultWriteContract } from "../contract/treasuryVaultContract";

export class TreasuryVaultWriteService {
  // --- User actions ---

  depositFunds = async (amount: bigint): Promise<void> => {
    await treasuryVaultWriteContract!.write.depositFunds([amount]);
  };

  withdraw = async (to: `0x${string}`, amount: bigint): Promise<void> => {
    await treasuryVaultWriteContract!.write.withdraw([to, amount]);
  };

  sendReward = async (to: `0x${string}`, amount: bigint): Promise<void> => {
    await treasuryVaultWriteContract!.write.sendReward([to, amount]);
  };
}
