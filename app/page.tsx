"use client";

import { WalletConnectButton } from "@/features/wallet/components/WalletConnectButton";
import { useWallet } from "@/features/wallet/hooks/useWallet";
import { useNetworkStatus } from "@/features/wallet/hooks/useNetwork";

export default function Home() {
  const { address, isConnected, disconnect, walletType } = useWallet();
  const { networkName, isSupported } = useNetworkStatus();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <WalletConnectButton />
      {isConnected && (
        <div>
          <p>Connected with: {walletType}</p>
          <p>Address: {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
          <span
            className={`${isSupported ? "text-green-500" : "text-red-500"}`}
          >
            {networkName} {isSupported ? "(Supported)" : "(Unsupported)"}
          </span>
        </div>
      )}
    </div>
  );
}
