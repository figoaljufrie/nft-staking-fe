import { myNFTReadContract } from "@/lib/contracts/nft/MyNFTContract";
import { isValidAddress, isPositiveBigInt } from "@/lib/utils/validation";

export class NFTReadService {
  private ensureContractConnected() {
    if (!myNFTReadContract?.read) throw new Error("Contract not initialized");
  }

  getAvailableNFTWithMetadata = async (): Promise<
    { tokenId: bigint; name: string; image: string; description: string }[]
  > => {
    this.ensureContractConnected();

    const [nextTokenId, maxSupply] = await Promise.all([
      myNFTReadContract.read._nextTokenId() as Promise<bigint>,
      myNFTReadContract.read.MAX_SUPPLY() as Promise<bigint>,
    ]);

    if (!isPositiveBigInt(nextTokenId) || !isPositiveBigInt(maxSupply))
      throw new Error("Invalid token IDs from contract");

    if (nextTokenId > maxSupply) return [];

    const availableNFTs: {
      tokenId: bigint;
      name: string;
      image: string;
      description: string;
    }[] = [];

    for (let tid = nextTokenId; tid <= maxSupply; tid++) {
      availableNFTs.push({
        tokenId: tid,
        name: `NFT #${tid}`,
        image: `/images/placeholder.png`,
        description: `This NFT #${tid} is available for minting`,
      });
    }
    return availableNFTs;
  };

  getName = async (): Promise<string> => {
    this.ensureContractConnected();
    const name = await myNFTReadContract.read.name();
    if (!name || typeof name !== "string")
      throw new Error("Invalid token name");
    return name;
  };

  getSymbol = async (): Promise<string> => {
    this.ensureContractConnected();
    const symbol = await myNFTReadContract.read.symbol();
    if (!symbol || typeof symbol !== "string")
      throw new Error("Invalid token symbol");
    return symbol;
  };

  getTotalSupply = async (): Promise<bigint> => {
    this.ensureContractConnected();
    const totalSupply = (await myNFTReadContract.read.totalSupply()) as bigint;
    if (!isPositiveBigInt(totalSupply)) throw new Error("Invalid total supply");
    return totalSupply;
  };

  getMaxSupply = async (): Promise<bigint> => {
    this.ensureContractConnected();
    const maxSupply = (await myNFTReadContract.read.MAX_SUPPLY()) as bigint;
    if (!isPositiveBigInt(maxSupply)) throw new Error("Invalid MAX_SUPPLY");
    return maxSupply;
  };

  getMintPrice = async (): Promise<bigint> => {
    this.ensureContractConnected();
    const mintPrice = (await myNFTReadContract.read.mintPrice()) as bigint;
    if (!isPositiveBigInt(mintPrice)) throw new Error("Invalid mintPrice");
    return mintPrice;
  };

  getOwnerOf = async (tokenId: bigint): Promise<`0x${string}`> => {
    this.ensureContractConnected();
    if (!isPositiveBigInt(tokenId)) throw new Error("Invalid token ID");
    try {
      const owner = (await myNFTReadContract.read.ownerOf([tokenId])) as string;
      if (!isValidAddress(owner)) throw new Error("Invalid owner address");
      return owner as `0x${string}`;
    } catch {
      throw new Error("Token does not exist");
    }
  };

  getTokenURI = async (tokenId: bigint): Promise<string> => {
    this.ensureContractConnected();
    if (!isPositiveBigInt(tokenId)) throw new Error("Invalid token ID");
    try {
      const uri = await myNFTReadContract.read.tokenURI([tokenId]);
      if (!uri || typeof uri !== "string") throw new Error("Invalid token URI");
      return uri;
    } catch {
      throw new Error("Token URI fetch failed");
    }
  };

  getBalanceOf = async (owner: `0x${string}`): Promise<bigint> => {
    this.ensureContractConnected();
    if (!isValidAddress(owner)) throw new Error("Invalid owner address");
    const balance = (await myNFTReadContract.read.balanceOf([owner])) as bigint;
    if (!isPositiveBigInt(balance)) throw new Error("Invalid balance");
    return balance;
  };

  getTokensOfOwnerByIndex = async (
    owner: `0x${string}`,
    index: bigint
  ): Promise<bigint> => {
    this.ensureContractConnected();
    if (!isValidAddress(owner)) throw new Error("Invalid owner address");
    if (!isPositiveBigInt(index)) throw new Error("Invalid index");
    try {
      const tokenId = (await myNFTReadContract.read.tokenOfOwnerByIndex([
        owner,
        index,
      ])) as bigint;
      if (!isPositiveBigInt(tokenId)) throw new Error("Invalid tokenId");
      return tokenId;
    } catch {
      throw new Error("Failed to fetch token by index");
    }
  };

  getOwner = async (): Promise<`0x${string}`> => {
    this.ensureContractConnected();
    const owner = (await myNFTReadContract.read.owner()) as string;
    if (!isValidAddress(owner)) throw new Error("Invalid contract owner");
    return owner as `0x${string}`;
  };

  getMintedNFTs = async (start: number, limit: number) => {
  this.ensureContractConnected();
  
  const totalSupply = await this.getTotalSupply();
  const mintedCount = Number(totalSupply);
  
  const nfts = [];
  const end = Math.min(start + limit, mintedCount);
  
  for (let i = start; i < end; i++) {
    try {
      const tokenId = BigInt(i);
      const owner = await this.getOwnerOf(tokenId);
      const uri = await this.getTokenURI(tokenId);
      // Fetch metadata from IPFS/URL if needed
      nfts.push({ tokenId, owner, uri });
    } catch (err) {
      console.warn(`Failed to fetch token ${i}:`, err);
    }
  }
  
  return { nfts, total: mintedCount };
};

  getAllTokensOfOwner = async (owner: `0x${string}`): Promise<bigint[]> => {
    this.ensureContractConnected();
    if (!isValidAddress(owner)) throw new Error("Invalid wallet address");

    const balance = await this.getBalanceOf(owner);
    if (balance === 0n) return [];

    const tokens: bigint[] = [];
    for (let i = 0n; i < balance; i++) {
      try {
        const tokenId = await this.getTokensOfOwnerByIndex(owner, i);
        tokens.push(tokenId);
      } catch (err) {
        console.warn(`Failed to fetch token at index ${i}:`, err);
      }
    }
    return tokens;
  };
}
