import { getMyNFTWriteContract } from "@/lib/contracts/nft/MyNFTContract";
import {
  ensureWalletAndNetwork,
  ensureContractExists,
} from "@/lib/utils/checkUtils";
import { isValidAddress, isPositiveBigInt } from "@/lib/utils/validation";
import { type WalletClient, type PublicClient } from "viem";

export class NFTWriteService {
  constructor(
    private walletClient: WalletClient | undefined,
    private publicClient: PublicClient
  ) {}

  mintPublic = async (tokenURI_: string, value: bigint) => {
    if (!tokenURI_ || typeof tokenURI_ !== "string")
      throw new Error("Invalid tokenURI");
    if (!isPositiveBigInt(value)) throw new Error("Invalid mint value");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient, value);

    const writeContract = this.walletClient
      ? getMyNFTWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.mintPublic([tokenURI_], { value });
  };

  approve = async (to: `0x${string}`, tokenId: bigint) => {
    if (!isValidAddress(to)) throw new Error("Invalid recipient address");
    if (!isPositiveBigInt(tokenId)) throw new Error("Invalid tokenId");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);

    const writeContract = this.walletClient
      ? getMyNFTWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.approve([to, tokenId]);
  };

  setApprovalForAll = async (operator: `0x${string}`, approved: boolean) => {
    if (!isValidAddress(operator)) throw new Error("Invalid operator address");
    if (typeof approved !== "boolean")
      throw new Error("Approved must be boolean");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);

    const writeContract = this.walletClient
      ? getMyNFTWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.setApprovalForAll([operator, approved]);
  };

  safeTransferFrom = async (
    from: `0x${string}`,
    to: `0x${string}`,
    tokenId: bigint,
    data?: string
  ) => {
    if (!isValidAddress(from)) throw new Error("Invalid sender address");
    if (!isValidAddress(to)) throw new Error("Invalid recipient address");
    if (!isPositiveBigInt(tokenId)) throw new Error("Invalid tokenId");
    if (data && typeof data !== "string")
      throw new Error("Data must be a string");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);

    const writeContract = this.walletClient
      ? getMyNFTWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return data
      ? await writeContract!.write.safeTransferFrom([from, to, tokenId, data])
      : await writeContract!.write.safeTransferFrom([from, to, tokenId]);
  };

  transferFrom = async (
    from: `0x${string}`,
    to: `0x${string}`,
    tokenId: bigint
  ) => {
    if (!isValidAddress(from)) throw new Error("Invalid sender address");
    if (!isValidAddress(to)) throw new Error("Invalid recipient address");
    if (!isPositiveBigInt(tokenId)) throw new Error("Invalid tokenId");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);

    const writeContract = this.walletClient
      ? getMyNFTWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.transferFrom([from, to, tokenId]);
  };

  burn = async (tokenId: bigint) => {
    if (!isPositiveBigInt(tokenId)) throw new Error("Invalid tokenId");

    await ensureWalletAndNetwork(this.walletClient, this.publicClient);

    const writeContract = this.walletClient
      ? getMyNFTWriteContract(this.walletClient)
      : undefined;
    ensureContractExists(writeContract);

    return await writeContract!.write.burn([tokenId]);
  };
}
