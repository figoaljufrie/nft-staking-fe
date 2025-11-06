"use client";

import { WalletConnectButton } from "@/features/wallet/components/WalletConnectButton";
import { useWallet } from "@/features/wallet/hooks/useWallet";
import { useNetworkStatus } from "@/features/wallet/hooks/useNetwork";
import { NavigationMenu } from "../../ui/navigation-menu";

export default function Header() {
  const { address, isConnected, disconnect, walletType } = useWallet();
  const { networkName, isSupported } = useNetworkStatus();

  return (
    <header className="w-full sticky top-0 z-40 bg-white backdrop-blur">
      <nav className="max-w-screen mx-4 py-3 flex justify-between items-center text-black">
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg">Staking Project</div>
          <NavigationMenu />
        </div>
        <WalletConnectButton />
        {isConnected && (
          <div>
            <p>Conntectedwith: {walletType}</p>
            <p>Address: {address}</p>
            <button onClick={() => disconnect()}>Disconnect</button>
            <span
              className={`${isSupported ? "text-green-500" : "text-red-500"}`}
            >
              {networkName} {isSupported ? "(Supported)" : "(Unsupported)"}
            </span>
          </div>
        )}
      </nav>
    </header>
  );
}