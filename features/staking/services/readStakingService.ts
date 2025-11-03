// lib/services/stakingManagerReadService.ts
import { stakingManagerReadContract } from "../contract/stakingContract";

/**
 * Read-only service for StakingManager.
 * All functions use publicClient-backed contract instance.
 */
export class StakingManagerReadService {
  // --- Basic info / config ---
  getVersion = async (): Promise<string> => {
    return (await stakingManagerReadContract.read.version()) as string;
  };

  getOwner = async (): Promise<`0x${string}`> => {
    return (await stakingManagerReadContract.read.owner()) as `0x${string}`;
  };

  isPaused = async (): Promise<boolean> => {
    return (await stakingManagerReadContract.read.paused()) as boolean;
  };

  getRewardRate = async (): Promise<bigint> => {
    return (await stakingManagerReadContract.read.rewardRate()) as bigint;
  };

  getRewardToken = async (): Promise<`0x${string}`> => {
    return (await stakingManagerReadContract.read.rewardToken()) as `0x${string}`;
  };

  getNFTCollection = async (): Promise<`0x${string}`> => {
    return (await stakingManagerReadContract.read.nftCollection()) as `0x${string}`;
  };

  // --- User stake information ---
  getUserStakeInfo = async (user: `0x${string}`) => {
    const [tokens, lastClaim, accumulated] =
      (await stakingManagerReadContract.read.getUserStakeInfo([user])) as [
        bigint[],
        bigint,
        bigint
      ];
    return {
      tokens,
      lastClaim,
      accumulated,
    };
  };

  getFullStake = async (user: `0x${string}`) => {
    const [tokenIds, lastClaim, accumulated, pending] =
      (await stakingManagerReadContract.read.getFullStake([user])) as [
        bigint[],
        bigint,
        bigint,
        bigint
      ];
    return {
      tokenIds,
      lastClaim,
      accumulated,
      pending,
    };
  };

  getStakedTokens = async (user: `0x${string}`): Promise<bigint[]> => {
    return (await stakingManagerReadContract.read.getStakedTokens([
      user,
    ])) as bigint[];
  };

  getTokenIndex = async (user: `0x${string}`, tokenId: bigint) => {
    const [index, exists] =
      (await stakingManagerReadContract.read.getTokenIndex([
        user,
        tokenId,
      ])) as [bigint, boolean];

    return { index, exists };
  };

  pendingRewards = async (user: `0x${string}`): Promise<bigint> => {
    return (await stakingManagerReadContract.read.pendingRewards([
      user,
    ])) as bigint;
  };

  // --- Utility / upgrade-related reads (safe to expose) ---
  getUpgradeInterfaceVersion = async (): Promise<string> => {
    return (await stakingManagerReadContract.read.UPGRADE_INTERFACE_VERSION()) as string;
  };

  getProxiableUUID = async (): Promise<string> => {
    return (await stakingManagerReadContract.read.proxiableUUID()) as string;
  };
}
