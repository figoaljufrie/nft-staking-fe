// app/page.tsx - Dashboard
"use client";

import { useAccount } from "wagmi";
import { formatEther, formatUnits } from "viem";
import Link from "next/link";

// NFT Hooks
import {
  useNFTName,
  useNFTSymbol,
  useTotalSupply as useNFTTotalSupply,
  useMaxSupply as useNFTMaxSupply,
} from "@/features/nft/hooks/read/useNftInfo";
import { useMintPrice } from "@/features/nft/hooks/read/useNftPrice";

// Reward Token Hooks
import {
  useRewardTokenName,
  useRewardTokenSymbol,
  useRewardTokenDecimals,
} from "@/features/Reward/hooks/read/useRewardInfo";
import {
  useTotalSupply as useRewardTotalSupply,
  useMaxSupply as useRewardMaxSupply,
} from "@/features/Reward/hooks/read/useRewardSupply";

// Staking Hooks
import { useVersion as useStakingVersion } from "@/features/staking/hooks/read/useStakingInfo";
import { useRewardRate } from "@/features/staking/hooks/read/useStakingRewards";

// Treasury Hooks
import { useTreasuryBalance } from "@/features/treasury/hooks/read/useTreasuryBalance";

export default function Dashboard() {
  const { address, isConnected } = useAccount();

  // NFT Data
  const { data: nftName } = useNFTName();
  const { data: nftSymbol } = useNFTSymbol();
  const { data: nftTotalSupply } = useNFTTotalSupply();
  const { data: nftMaxSupply } = useNFTMaxSupply();
  const { data: mintPrice } = useMintPrice();

  // Reward Token Data
  const { data: rewardName } = useRewardTokenName();
  const { data: rewardSymbol } = useRewardTokenSymbol();
  const { data: rewardDecimals } = useRewardTokenDecimals();
  const { data: rewardTotalSupply } = useRewardTotalSupply();
  const { data: rewardMaxSupply } = useRewardMaxSupply();

  // Staking Data
  const { data: rewardRate } = useRewardRate();
  const { data: stakingVersion } = useStakingVersion();

  // Treasury Data
  const { data: treasuryBalance } = useTreasuryBalance();

  // if (!isConnected) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
  //       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
  //         <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
  //           <svg
  //             className="w-10 h-10 text-white"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  //             />
  //           </svg>
  //         </div>
  //         <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome!</h2>
  //         <p className="text-gray-600 mb-6">
  //           Connect your wallet to access the NFT Staking Platform
  //         </p>
  //         <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
  //           <p className="font-semibold mb-2">What you can do:</p>
  //           <ul className="text-left space-y-1">
  //             <li>• Mint exclusive NFTs</li>
  //             <li>• Stake NFTs for rewards</li>
  //             <li>• Earn reward tokens</li>
  //             <li>• Manage your assets</li>
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            NFT Staking Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Stake your NFTs • Earn Rewards • Manage Your Portfolio
          </p>
        </div>

        {/* NFT Collection Stats */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            NFT Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Collection Name"
              value={nftName || "Loading..."}
              icon={<CollectionIcon />}
              gradient="from-blue-500 to-blue-600"
            />
            <StatCard
              label="Symbol"
              value={nftSymbol || "Loading..."}
              icon={<SymbolIcon />}
              gradient="from-indigo-500 to-indigo-600"
            />
            <StatCard
              label="Minted / Max Supply"
              value={
                nftTotalSupply && nftMaxSupply
                  ? `${nftTotalSupply.toString()} / ${nftMaxSupply.toString()}`
                  : "Loading..."
              }
              icon={<SupplyIcon />}
              gradient="from-purple-500 to-purple-600"
            />
            <StatCard
              label="Mint Price"
              value={mintPrice ? `${formatEther(mintPrice)} ETH` : "Loading..."}
              icon={<PriceIcon />}
              gradient="from-pink-500 to-pink-600"
            />
          </div>
        </section>

        {/* Reward Token Stats */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Reward Token
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Token Name"
              value={rewardName || "Loading..."}
              icon={<TokenIcon />}
              gradient="from-green-500 to-green-600"
            />
            <StatCard
              label="Symbol"
              value={rewardSymbol || "Loading..."}
              icon={<SymbolIcon />}
              gradient="from-teal-500 to-teal-600"
            />
            <StatCard
              label="Total Supply"
              value={
                rewardTotalSupply && rewardDecimals
                  ? parseFloat(
                      formatUnits(rewardTotalSupply, rewardDecimals)
                    ).toLocaleString()
                  : "Loading..."
              }
              icon={<SupplyIcon />}
              gradient="from-emerald-500 to-emerald-600"
            />
            <StatCard
              label="Max Supply"
              value={
                rewardMaxSupply && rewardDecimals
                  ? parseFloat(
                      formatUnits(rewardMaxSupply, rewardDecimals)
                    ).toLocaleString()
                  : "Loading..."
              }
              icon={<MaxSupplyIcon />}
              gradient="from-cyan-500 to-cyan-600"
            />
          </div>
        </section>

        {/* Staking & Treasury */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Staking System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Reward Rate"
              value={
                rewardRate ? `${rewardRate.toString()} / day` : "Loading..."
              }
              icon={<RewardRateIcon />}
              gradient="from-orange-500 to-orange-600"
            />
            <StatCard
              label="Contract Version"
              value={stakingVersion || "Loading..."}
              icon={<VersionIcon />}
              gradient="from-red-500 to-red-600"
            />
            <StatCard
              label="Treasury Balance"
              value={
                treasuryBalance && rewardDecimals
                  ? `${parseFloat(
                      formatUnits(treasuryBalance, rewardDecimals)
                    ).toLocaleString()} ${rewardSymbol || ""}`
                  : "Loading..."
              }
              icon={<TreasuryIcon />}
              gradient="from-amber-500 to-amber-600"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard
              title="Mint NFT"
              description="Mint new NFTs from the collection"
              icon={<MintIcon />}
              href="/mint"
              color="blue"
            />
            <ActionCard
              title="My Assets"
              description="View and manage your NFTs"
              icon={<AssetsIcon />}
              href="/assets"
              color="purple"
            />
            <ActionCard
              title="Stake NFTs"
              description="Stake your NFTs to earn rewards"
              icon={<StakeIcon />}
              href="/staking"
              color="green"
            />
            <ActionCard
              title="Manage Tokens"
              description="Transfer and manage reward tokens"
              icon={<TokensIcon />}
              href="/tokens"
              color="orange"
            />
          </div>
        </section>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard
            title="How Staking Works"
            items={[
              "Mint or acquire NFTs from the collection",
              "Stake your NFTs in the staking contract",
              "Earn reward tokens automatically over time",
              "Claim rewards anytime without unstaking",
              "Withdraw NFTs whenever you want",
            ]}
            gradient="from-blue-500 to-purple-600"
          />
          <InfoCard
            title="Your Wallet"
            items={[
              `Address: ${address?.slice(0, 6)}...${address?.slice(-4)}`,
              "Network: Connected ✓",
              "Status: Active",
              `Collection: ${nftSymbol || "Loading..."}`,
              `Reward Token: ${rewardSymbol || "Loading..."}`,
            ]}
            gradient="from-green-500 to-teal-600"
          />
        </div>
      </div>
    </div>
  );
}

// Component: StatCard
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
}

function StatCard({ label, value, icon, gradient }: StatCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium opacity-90">{label}</span>
        <div className="opacity-80">{icon}</div>
      </div>
      <div className="text-2xl font-bold break-words">{value}</div>
    </div>
  );
}

// Component: ActionCard
interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: "blue" | "purple" | "green" | "orange";
}

function ActionCard({
  title,
  description,
  icon,
  href,
  color,
}: ActionCardProps) {
  const colors = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    purple:
      "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
    green:
      "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    orange:
      "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
  };

  return (
    <Link href={href}>
      <div
        className={`bg-gradient-to-br ${colors[color]} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105`}
      >
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </Link>
  );
}

// Component: InfoCard
interface InfoCardProps {
  title: string;
  items: string[];
  gradient: string;
}

function InfoCard({ title, items, gradient }: InfoCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white shadow-lg`}
    >
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Icons
const CollectionIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

const SymbolIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const SupplyIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const PriceIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TokenIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const MaxSupplyIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

const RewardRateIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const VersionIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const TreasuryIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const MintIcon = () => (
  <svg
    className="w-12 h-12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const AssetsIcon = () => (
  <svg
    className="w-12 h-12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const StakeIcon = () => (
  <svg
    className="w-12 h-12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const TokensIcon = () => (
  <svg
    className="w-12 h-12"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
