import { rewardTokenWriteContract } from "../contract/rewardTokenContract";

export class RewardTokenWriteService {
  // === ERC20 User Write Operations ===

  approve = async (spender: string, value: bigint): Promise<void> => {
    await rewardTokenWriteContract!.write.approve([spender, value]);
  };

  transfer = async (to: string, value: bigint): Promise<void> => {
    await rewardTokenWriteContract!.write.transfer([to, value]);
  };

  transferFrom = async (
    from: string,
    to: string,
    value: bigint
  ): Promise<void> => {
    await rewardTokenWriteContract!.write.transferFrom([from, to, value]);
  };

  burn = async (value: bigint): Promise<void> => {
    await rewardTokenWriteContract!.write.burn([value]);
  };

  burnFrom = async (account: string, value: bigint): Promise<void> => {
    await rewardTokenWriteContract!.write.burnFrom([account, value]);
  };
}
