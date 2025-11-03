import { MyNFTContract } from "../contract/MyNFTContract";

export class NFTReadService {
  getName = async (): Promise<string> => {
    return (await MyNFTContract.read.name()) as string;
  };

  getSymbol = async (): Promise<string> => {
    return (await MyNFTContract.read.symbol()) as string;
  };

  getTotalSupply = async (): Promise<bigint> => {
    return (await MyNFTContract.read.totalSupply()) as bigint;
  };

  getMaxSupply = async (): Promise<bigint> => {
    return (await MyNFTContract.read.MAX_SUPPLY()) as bigint;
  };

  getMintPrice = async (): Promise<bigint> => {
    return (await MyNFTContract.read.mintPrice()) as bigint;
  };

  getOwnerOf = async (tokenId: bigint): Promise<`0x${string}`> => {
    const owner = await MyNFTContract.read.ownerOf([tokenId]);
    return owner as `0x${string}`;
  };

  getTokenURI = async (tokenId: bigint): Promise<string> => {
    return (await MyNFTContract.read.tokenURI([tokenId])) as string;
  };

  getBalanceOf = async (owner: `0x${string}`): Promise<bigint> => {
    return (await MyNFTContract.read.balanceOf([owner as string])) as bigint;
  };

  getTokensOfOwnerByIndex = async (
    owner: `0x${string}`,
    index: bigint
  ): Promise<bigint> => {
    return (await MyNFTContract.read.tokenOfOwnerByIndex([
      owner as string,
      index,
    ])) as bigint;
  };

  getOwner = async (): Promise<`0x${string}`> => {
    const owner = await MyNFTContract.read.owner();
    return owner as `0x${string}`;
  };

  getAllTokensOfOwner = async (owner: `0x${string}`) => {
    const balance = await this.getBalanceOf(owner);
    const tokens: bigint[] = [];
    for (let i = 0n; i < balance; i++) {
      const tokenId = await this.getTokensOfOwnerByIndex(owner, i);
      tokens.push(tokenId);
    }
    return tokens;
  };
}

// Export a singleton instance
export const nftReadService = new NFTReadService();
