import { rewardTokenReadContract } from "../contract/rewardTokenContract";

export class RewardTokenService {
  // === ERC20 Standard functions ===
  getName = async (): Promise<string> => {
    return (await rewardTokenReadContract.read.name()) as string;
  };

  getSymbol = async (): Promise<string> => {
    return (await rewardTokenReadContract.read.symbol()) as string;
  };

  getDecimals = async (): Promise<number> => {
    return (await rewardTokenReadContract.read.decimals()) as number;
  };

  getTotalSupply = async (): Promise<bigint> => {
    return (await rewardTokenReadContract.read.totalSupply()) as bigint;
  };

  getBalanceOf = async (account: string): Promise<bigint> => {
    return (await rewardTokenReadContract.read.balanceOf([account])) as bigint;
  };

  getAllowance = async (owner: string, spender: string): Promise<bigint> => {
    return (await rewardTokenReadContract.read.allowance([
      owner,
      spender,
    ])) as bigint;
  };

  //===Ownership & Metadata ===

  getOwner = async (): Promise<string> => {
    return (await rewardTokenReadContract.read.owner()) as string;
  };

  getVersion = async (): Promise<string> => {
    return (await rewardTokenReadContract.read.version()) as string;
  };

  getMaxSupply = async (): Promise<bigint> => {
    return (await rewardTokenReadContract.read.MAX_SUPPLY()) as bigint;
  };

  getStakingManager = async (): Promise<string> => {
    return (await rewardTokenReadContract.read.stakingManager()) as string;
  };

  getPausedState = async (): Promise<boolean> => {
    return (await rewardTokenReadContract.read.paused()) as boolean;
  };

  getUpgradeInterfaceVersion = async (): Promise<string> => {
    return (await rewardTokenReadContract.read.UPGRADE_INTERFACE_VERSION()) as string;
  };
}
