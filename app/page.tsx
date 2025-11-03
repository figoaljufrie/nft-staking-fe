"use client";

import { WalletConnectButton } from "@/features/wallet/components/WalletConnectButton";
import { useWallet } from "@/features/wallet/hooks/useWallet";

export default function Home() {
  const { address, isConnected, disconnect, walletType } = useWallet();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <WalletConnectButton />
      {isConnected && (
        <div>
          <p>Connected with: {walletType}</p>
          <p>Address: {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
