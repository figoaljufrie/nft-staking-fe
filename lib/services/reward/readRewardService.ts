import { isPositiveBigInt, isValidAddress } from "@/lib/utils/validation";
import { rewardTokenReadContract } from "@/lib/contracts/reward/rewardTokenContract";

export class RewardTokenReadService {
  private ensureContractConnected() {
    if (!rewardTokenReadContract?.read)
      throw new Error("Contract not initialized");
  }

  getName = async (): Promise<string> => {
    this.ensureContractConnected();
    const name = await rewardTokenReadContract.read.name();
    if (!name || typeof name !== "string")
      throw new Error("Invalid token name");
    return name;
  };

  getSymbol = async (): Promise<string> => {
    this.ensureContractConnected();
    const symbol = await rewardTokenReadContract.read.symbol();
    if (!symbol || typeof symbol !== "string")
      throw new Error("Invalid token symbol");
    return symbol;
  };

  getDecimals = async (): Promise<number> => {
    this.ensureContractConnected();
    const decimals = await rewardTokenReadContract.read.decimals();
    if (typeof decimals !== "number") throw new Error("Invalid decimals");
    return decimals;
  };

  getTotalSupply = async (): Promise<bigint> => {
    this.ensureContractConnected();
    const totalSupply =
      (await rewardTokenReadContract.read.totalSupply()) as bigint;
    if (!isPositiveBigInt(totalSupply)) throw new Error("Invalid total supply");
    return totalSupply;
  };

  getBalanceOf = async (account: string): Promise<bigint> => {
    this.ensureContractConnected();
    if (!isValidAddress(account)) throw new Error("Invalid account");
    const balance = (await rewardTokenReadContract.read.balanceOf([
      account,
    ])) as bigint;
    if (!isPositiveBigInt(balance)) throw new Error("Invalid balance");
    return balance;
  };

  getAllowance = async (
    owner: `0x${string}`,
    spender: `0x${string}`
  ): Promise<bigint> => {
    this.ensureContractConnected();
    if (!isValidAddress(owner)) throw new Error("Invalid owner address");
    if (!isValidAddress(spender)) throw new Error("Invalid spender address");
    const allowance = (await rewardTokenReadContract.read.allowance([
      owner,
      spender,
    ])) as bigint;
    if (!isPositiveBigInt(allowance)) throw new Error("Invalid allowance");
    return allowance;
  };

  getOwner = async (): Promise<string> => {
    this.ensureContractConnected();
    const owner = (await rewardTokenReadContract.read.owner()) as string;
    if (!isValidAddress(owner)) throw new Error("Invalid contract owner");
    return owner;
  };

  getMaxSupply = async (): Promise<bigint> => {
    this.ensureContractConnected();
    const maxSupply =
      (await rewardTokenReadContract.read.MAX_SUPPLY()) as bigint;
    if (!isPositiveBigInt(maxSupply)) throw new Error("Invalid MAX_SUPPLY");
    return maxSupply;
  };

  getStakingManager = async (): Promise<string> => {
    this.ensureContractConnected();
    const stakingManager =
      (await rewardTokenReadContract.read.stakingManager()) as string;
    if (!isValidAddress(stakingManager))
      throw new Error("Invalid staking manager address");
    return stakingManager;
  };

  getPausedState = async (): Promise<boolean> => {
    this.ensureContractConnected();
    return (await rewardTokenReadContract.read.paused()) as boolean;
  };

  getUpgradeInterfaceVersion = async (): Promise<string> => {
    this.ensureContractConnected();
    return (await rewardTokenReadContract.read.UPGRADE_INTERFACE_VERSION()) as string;
  };
}
