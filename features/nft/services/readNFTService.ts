import { myNFTReadContract } from "../contract/myNFTContract";

export class NFTReadService {
  getName = async (): Promise<string> => {
    return (await myNFTReadContract.read.name()) as string;
  };

  getSymbol = async (): Promise<string> => {
    return (await myNFTReadContract.read.symbol()) as string;
  };

  getTotalSupply = async (): Promise<bigint> => {
    return (await myNFTReadContract.read.totalSupply()) as bigint;
  };

  getMaxSupply = async (): Promise<bigint> => {
    return (await myNFTReadContract.read.MAX_SUPPLY()) as bigint;
  };

  getMintPrice = async (): Promise<bigint> => {
    return (await myNFTReadContract.read.mintPrice()) as bigint;
  };

  getOwnerOf = async (tokenId: bigint): Promise<`0x${string}`> => {
    const owner = await myNFTReadContract.read.ownerOf([tokenId]);
    return owner as `0x${string}`;
  };

  getTokenURI = async (tokenId: bigint): Promise<string> => {
    return (await myNFTReadContract.read.tokenURI([tokenId])) as string;
  };

  getBalanceOf = async (owner: `0x${string}`): Promise<bigint> => {
    return (await myNFTReadContract.read.balanceOf([owner as string])) as bigint;
  };

  getTokensOfOwnerByIndex = async (
    owner: `0x${string}`,
    index: bigint
  ): Promise<bigint> => {
    return (await myNFTReadContract.read.tokenOfOwnerByIndex([
      owner as string,
      index,
    ])) as bigint;
  };

  getOwner = async (): Promise<`0x${string}`> => {
    const owner = await myNFTReadContract.read.owner();
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
