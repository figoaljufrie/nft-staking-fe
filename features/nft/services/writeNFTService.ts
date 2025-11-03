import { myNFTWriteContract } from "../contract/myNFTContract";

export class NFTWriteService {
  mintPublic = async (tokenURI_: string, value: bigint) => {
    return await myNFTWriteContract!.write.mintPublic([tokenURI_], { value });
  };

  approve = async (to: `0x${string}`, tokenId: bigint) => {
    return await myNFTWriteContract!.write.approve([to, tokenId]);
  };

  setApprovalForAll = async (operator: `0x${string}`, approved: boolean) => {
    return await myNFTWriteContract!.write.setApprovalForAll([
      operator,
      approved,
    ]);
  };

  safeTransferFrom = async (
    from: `0x${string}`,
    to: `0x${string}`,
    tokenId: bigint,
    data?: string
  ) => {
    if (data) {
      return await myNFTWriteContract!.write.safeTransferFrom([
        from,
        to,
        tokenId,
        data,
      ]);
    }
    return await myNFTWriteContract!.write.safeTransferFrom([
      from,
      to,
      tokenId,
    ]);
  };

  transferFrom = async (
    from: `0x${string}`,
    to: `0x${string}`,
    tokenId: bigint
  ) => {
    return await myNFTWriteContract!.write.transferFrom([from, to, tokenId]);
  };

  burn = async (tokenId: bigint) => {
    return await myNFTWriteContract!.write.burn([tokenId]);
  };
}
