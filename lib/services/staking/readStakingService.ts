import { stakingManagerReadContract } from "@/lib/contracts/staking/stakingContract";
import { isPositiveBigInt, isValidAddress } from "@/lib/utils/validation";

export class StakingManagerReadService {
  private ensureContractConnected() {
    if (!stakingManagerReadContract?.read)
      throw new Error("Contract not initialized");
  }

  getVersion = async (): Promise<string> => {
    this.ensureContractConnected();
    const version = await stakingManagerReadContract.read.version();
    if (!version || typeof version !== "string")
      throw new Error("Invalid version");
    return version;
  };

  getOwner = async (): Promise<`0x${string}`> => {
    this.ensureContractConnected();
    const owner = (await stakingManagerReadContract.read.owner()) as string;
    if (!isValidAddress(owner)) throw new Error("Invalid owner address");
    return owner as `0x${string}`;
  };

  isPaused = async (): Promise<boolean> => {
    this.ensureContractConnected();
    const paused = await stakingManagerReadContract.read.paused();
    if (typeof paused !== "boolean") throw new Error("Invalid paused state");
    return paused;
  };

  getRewardRate = async (): Promise<bigint> => {
    this.ensureContractConnected();
    const rate = (await stakingManagerReadContract.read.rewardRate()) as bigint;
    if (!isPositiveBigInt(rate)) throw new Error("Invalid rewardRate");
    return rate;
  };

  getRewardToken = async (): Promise<`0x${string}`> => {
    this.ensureContractConnected();
    const token =
      (await stakingManagerReadContract.read.rewardToken()) as string;
    if (!isValidAddress(token)) throw new Error("Invalid reward token address");
    return token as `0x${string}`;
  };

  getNFTCollection = async (): Promise<`0x${string}`> => {
    this.ensureContractConnected();
    const collection =
      (await stakingManagerReadContract.read.nftCollection()) as string;
    if (!isValidAddress(collection))
      throw new Error("Invalid NFT collection address");
    return collection as `0x${string}`;
  };

  getUserStakeInfo = async (user: `0x${string}`) => {
    this.ensureContractConnected();
    if (!isValidAddress(user)) throw new Error("Invalid user address");

    const [tokens, lastClaim, accumulated] =
      (await stakingManagerReadContract.read.getUserStakeInfo([user])) as [
        bigint[],
        bigint,
        bigint
      ];

    if (
      !tokens.every(isPositiveBigInt) ||
      !isPositiveBigInt(lastClaim) ||
      !isPositiveBigInt(accumulated)
    )
      throw new Error("Invalid user stake data");

    return { tokens, lastClaim, accumulated };
  };

  getFullStake = async (user: `0x${string}`) => {
    this.ensureContractConnected();
    if (!isValidAddress(user)) throw new Error("Invalid user address");

    const [tokenIds, lastClaim, accumulated, pending] =
      (await stakingManagerReadContract.read.getFullStake([user])) as [
        bigint[],
        bigint,
        bigint,
        bigint
      ];

    if (
      !tokenIds.every(isPositiveBigInt) ||
      !isPositiveBigInt(lastClaim) ||
      !isPositiveBigInt(accumulated) ||
      !isPositiveBigInt(pending)
    )
      throw new Error("Invalid full stake data");

    return { tokenIds, lastClaim, accumulated, pending };
  };

  getStakedTokens = async (user: `0x${string}`): Promise<bigint[]> => {
    this.ensureContractConnected();
    if (!isValidAddress(user)) throw new Error("Invalid user address");

    const tokens = (await stakingManagerReadContract.read.getStakedTokens([
      user,
    ])) as bigint[];
    if (!tokens.every(isPositiveBigInt))
      throw new Error("Invalid staked tokens");

    return tokens;
  };

  getTokenIndex = async (user: `0x${string}`, tokenId: bigint) => {
    this.ensureContractConnected();
    if (!isValidAddress(user)) throw new Error("Invalid user address");
    if (!isPositiveBigInt(tokenId)) throw new Error("Invalid tokenId");

    const [index, exists] =
      (await stakingManagerReadContract.read.getTokenIndex([
        user,
        tokenId,
      ])) as [bigint, boolean];
    if (!isPositiveBigInt(index) || typeof exists !== "boolean")
      throw new Error("Invalid token index data");

    return { index, exists };
  };

  pendingRewards = async (user: `0x${string}`): Promise<bigint> => {
    this.ensureContractConnected();
    if (!isValidAddress(user)) throw new Error("Invalid user address");

    const pending = (await stakingManagerReadContract.read.pendingRewards([
      user,
    ])) as bigint;
    if (!isPositiveBigInt(pending)) throw new Error("Invalid pending rewards");

    return pending;
  };

  getUpgradeInterfaceVersion = async (): Promise<string> => {
    this.ensureContractConnected();
    const version =
      await stakingManagerReadContract.read.UPGRADE_INTERFACE_VERSION();
    if (!version || typeof version !== "string")
      throw new Error("Invalid upgrade interface version");
    return version;
  };

  getProxiableUUID = async (): Promise<string> => {
    this.ensureContractConnected();
    const uuid = await stakingManagerReadContract.read.proxiableUUID();
    if (!uuid || typeof uuid !== "string")
      throw new Error("Invalid proxiable UUID");
    return uuid;
  };
}
