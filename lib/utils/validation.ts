export const isValidAddress = (addr: string): boolean =>
  /^0x[a-fA-F0-9]{40}$/.test(addr);

export const isPositiveBigInt = (val: bigint): boolean =>
  typeof val === "bigint" && val >= 0n;

export const isPositiveBigIntArray = (arr: bigint[]): boolean =>
  Array.isArray(arr) && arr.every((v) => typeof v === "bigint" && v >= 0n);

export const isValidTxHash = (hash: string): boolean =>
  /^0x([A-Fa-f0-9]{64})$/.test(hash);

