import { MyNFTContract } from "../contract/MyNFTContract";

export class NFTWriteService {
  mint = async (to: `0x${string}`, tokenURI_: string) => {
    return await MyNFTContract.write.mint([to, tokenURI_]);
  };

  mintPublic = async (tokenURI_: string, value: bigint) => {
    return await MyNFTContract.write.mintPublic([tokenURI_], { value });
  };

  approve = async (to: `0x${string}`, tokenId: bigint) => {
    return await MyNFTContract.write.approve([to, tokenId]);
  };

  setApprovalForAll = async (operator: `0x${string}`, approved: boolean) => {
    return await MyNFTContract.write.setApprovalForAll([operator, approved]);
  };
  safeTransferFrom = async (
    from: `0x${string}`,
    to: `0x${string}`,
    tokenId: bigint,
    data?: string
  ) => {
    if (data) {
      return await MyNFTContract.write.safeTransferFrom([
        from,
        to,
        tokenId,
        data,
      ]);
    }
    return await MyNFTContract.write.safeTransferFrom([from, to, tokenId]);
  };

  transferFrom = async (
    from: `0x${string}`,
    to: `0x${string}`,
    tokenId: bigint
  ) => {
    return await MyNFTContract.write.transferFrom([from, to, tokenId]);
  };

  burn = async (tokenId: bigint) => {
    return await MyNFTContract.write.burn([tokenId]);
  };

  setBaseURI = async (baseURI_: string) => {
    return await MyNFTContract.write.setBaseURI([baseURI_]);
  };

  setMintPrice = async (price: bigint) => {
    return await MyNFTContract.write.setMintPrice([price]);
  };

  withdraw = async () => {
    return await MyNFTContract.write.withdraw();
  };

  transferOwnership = async (newOwner: `0x${string}`) => {
    return await MyNFTContract.write.transferOwnership([newOwner]);
  };

  renounceOwnership = async () => {
    return await MyNFTContract.write.renounceOwnership();
  };
}
