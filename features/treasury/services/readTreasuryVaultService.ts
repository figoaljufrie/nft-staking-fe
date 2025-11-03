import { treasuryVaultReadContract } from "../contract/treasuryVaultContract";

/**
 * Read-only service for TreasuryVault.
 * Focused on user-facing queries only.
 */
export class TreasuryVaultReadService {
  // --- Core state reads ---
  getVersion = async (): Promise<string> => {
    return (await treasuryVaultReadContract.read.version()) as string;
  };

  getOwner = async (): Promise<`0x${string}`> => {
    return (await treasuryVaultReadContract.read.owner()) as `0x${string}`;
  };

  isPaused = async (): Promise<boolean> => {
    return (await treasuryVaultReadContract.read.paused()) as boolean;
  };

  getRewardToken = async (): Promise<`0x${string}`> => {
    return (await treasuryVaultReadContract.read.rewardToken()) as `0x${string}`;
  };

  getBalance = async (): Promise<bigint> => {
    return (await treasuryVaultReadContract.read.getBalance()) as bigint;
  };

  getUpgradeInterfaceVersion = async (): Promise<string> => {
    return (await treasuryVaultReadContract.read.UPGRADE_INTERFACE_VERSION()) as string;
  };

  getProxiableUUID = async (): Promise<`0x${string}`> => {
    return (await treasuryVaultReadContract.read.proxiableUUID()) as `0x${string}`;
  };
}
