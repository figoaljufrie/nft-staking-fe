import { treasuryVaultReadContract } from "@/lib/contracts/treasury/treasuryVaultContract";
import { isValidAddress, isPositiveBigInt } from "@/lib/utils/validation";

export class TreasuryVaultReadService {
  private ensureContractConnected() {
    if (!treasuryVaultReadContract?.read)
      throw new Error("Contract not initialized");
  }

  getVersion = async (): Promise<string> => {
    this.ensureContractConnected();
    const version = await treasuryVaultReadContract.read.version();
    if (!version || typeof version !== "string")
      throw new Error("Invalid version");
    return version;
  };

  getOwner = async (): Promise<`0x${string}`> => {
    this.ensureContractConnected();
    const owner = (await treasuryVaultReadContract.read.owner()) as string;
    if (!isValidAddress(owner)) throw new Error("Invalid owner address");
    return owner as `0x${string}`;
  };

  isPaused = async (): Promise<boolean> => {
    this.ensureContractConnected();
    const paused = await treasuryVaultReadContract.read.paused();
    if (typeof paused !== "boolean") throw new Error("Invalid paused state");
    return paused;
  };

  getRewardToken = async (): Promise<`0x${string}`> => {
    this.ensureContractConnected();
    const token =
      (await treasuryVaultReadContract.read.rewardToken()) as string;
    if (!isValidAddress(token)) throw new Error("Invalid reward token address");
    return token as `0x${string}`;
  };

  getBalance = async (): Promise<bigint> => {
    this.ensureContractConnected();
    const balance =
      (await treasuryVaultReadContract.read.getBalance()) as bigint;
    if (!isPositiveBigInt(balance)) throw new Error("Invalid treasury balance");
    return balance;
  };

  getUpgradeInterfaceVersion = async (): Promise<string> => {
    this.ensureContractConnected();
    const version =
      await treasuryVaultReadContract.read.UPGRADE_INTERFACE_VERSION();
    if (!version || typeof version !== "string")
      throw new Error("Invalid upgrade interface version");
    return version;
  };

  getProxiableUUID = async (): Promise<`0x${string}`> => {
    this.ensureContractConnected();
    const uuid =
      (await treasuryVaultReadContract.read.proxiableUUID()) as string;
    if (!isValidAddress(uuid)) throw new Error("Invalid proxiable UUID");
    return uuid as `0x${string}`;
  };
}
