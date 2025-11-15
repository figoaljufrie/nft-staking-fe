// app/tokens/page.tsx
'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { formatUnits, parseUnits, isAddress } from 'viem';

// Hooks
import { useBalanceOf } from '@/features/Reward/hooks/read/useRewardSupply';
import { useRewardTokenName, useRewardTokenDecimals, useRewardTokenSymbol } from '@/features/Reward/hooks/read/useRewardInfo';
import { useAllowance } from '@/features/Reward/hooks/read/useRewardAllowance';
import { useTransfer } from '@/features/Reward/hooks/write/useRewardTransfer';
import { useApprove } from '@/features/Reward/hooks/write/useRewardApprove';
import { useBurn } from '@/features/Reward/hooks/write/useRewardBurn';

export default function TokensPage() {
  const { address, isConnected } = useAccount();

  // Token Info
  const { data: tokenName } = useRewardTokenName();
  const { data: symbol } = useRewardTokenSymbol();
  const { data: decimals } = useRewardTokenDecimals();
  const { data: balance, isLoading: balanceLoading } = useBalanceOf(address);

  // Write hooks
  const transfer = useTransfer();
  const approve = useApprove();
  const burn = useBurn();

  // Transfer State
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);

  // Approval State
  const [approvalSpender, setApprovalSpender] = useState('');
  const [approvalAmount, setApprovalAmount] = useState('');
  const [isApproving, setIsApproving] = useState(false);

  // Check Allowance State
  const [checkSpender, setCheckSpender] = useState('');
  const { data: allowanceData } = useAllowance(
    address,
    isAddress(checkSpender) ? checkSpender as `0x${string}` : undefined
  );

  // Burn State
  const [burnAmount, setBurnAmount] = useState('');
  const [isBurning, setIsBurning] = useState(false);

  const handleTransfer = async () => {
    if (!transferTo || !transferAmount || !decimals || !isAddress(transferTo)) return;

    setIsTransferring(true);
    try {
      const amount = parseUnits(transferAmount, decimals);
      await transfer.mutateAsync({
        to: transferTo as `0x${string}`,
        value: amount,
      });
      
      setTransferTo('');
      setTransferAmount('');
      alert('Transfer successful!');
    } catch (error: any) {
      console.error('Transfer failed:', error);
      alert(error.message || 'Transfer failed');
    } finally {
      setIsTransferring(false);
    }
  };

  const handleApprove = async () => {
    if (!approvalSpender || !approvalAmount || !decimals || !isAddress(approvalSpender)) return;

    setIsApproving(true);
    try {
      const amount = parseUnits(approvalAmount, decimals);
      await approve.mutateAsync({
        spender: approvalSpender as `0x${string}`,
        value: amount,
      });
      
      setApprovalSpender('');
      setApprovalAmount('');
      alert('Approval successful!');
    } catch (error: any) {
      console.error('Approval failed:', error);
      alert(error.message || 'Approval failed');
    } finally {
      setIsApproving(false);
    }
  };

  const handleBurn = async () => {
    if (!burnAmount || !decimals) return;
    if (!confirm('Are you sure you want to burn these tokens? This action cannot be undone.')) return;

    setIsBurning(true);
    try {
      const amount = parseUnits(burnAmount, decimals);
      await burn.mutateAsync(amount);
      
      setBurnAmount('');
      alert('Tokens burned successfully!');
    } catch (error: any) {
      console.error('Burn failed:', error);
      alert(error.message || 'Burn failed');
    } finally {
      setIsBurning(false);
    }
  };

  const setMaxTransfer = () => {
    if (balance && decimals) {
      setTransferAmount(formatUnits(balance, decimals));
    }
  };

  const setMaxBurn = () => {
    if (balance && decimals) {
      setBurnAmount(formatUnits(balance, decimals));
    }
  };

  // if (!isConnected) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
  //       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
  //         <svg className="w-20 h-20 mx-auto text-blue-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  //         </svg>
  //         <h2 className="text-3xl font-bold text-gray-900 mb-3">Connect Your Wallet</h2>
  //         <p className="text-gray-600">Connect your wallet to manage tokens</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (balanceLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading token data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Token Manager
          </h1>
          <p className="text-xl text-gray-600">Manage your reward tokens</p>
        </div>

        {/* Token Info Card */}
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="text-sm text-green-100 mb-2">Your Balance</div>
              <div className="text-6xl font-bold mb-2">
                {balance && decimals ? parseFloat(formatUnits(balance, decimals)).toFixed(4) : '0.0000'}
              </div>
              <div className="text-xl text-green-100">{symbol || 'Tokens'}</div>
            </div>
            <svg className="w-32 h-32 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-green-400/30">
            <div>
              <div className="text-xs text-green-100 mb-1">Token Name</div>
              <div className="font-semibold">{tokenName || 'N/A'}</div>
            </div>
            <div>
              <div className="text-xs text-green-100 mb-1">Symbol</div>
              <div className="font-semibold">{symbol || 'N/A'}</div>
            </div>
            <div>
              <div className="text-xs text-green-100 mb-1">Decimals</div>
              <div className="font-semibold">{decimals || 0}</div>
            </div>
          </div>
        </div>

        {/* Transfer Tokens */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transfer Tokens</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {transferTo && !isAddress(transferTo) && (
                <p className="mt-2 text-sm text-red-600">Invalid address</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={setMaxTransfer}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 font-semibold text-sm hover:text-blue-700"
                >
                  MAX
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Balance: {balance && decimals ? formatUnits(balance, decimals) : '0'} {symbol || ''}
              </p>
            </div>

            <button
              onClick={handleTransfer}
              disabled={!transferTo || !transferAmount || !isAddress(transferTo) || isTransferring}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isTransferring ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Transferring...
                </>
              ) : (
                'Transfer'
              )}
            </button>
          </div>
        </div>

        {/* Approve Spender */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Approve Spender</h2>
          <p className="text-gray-600 mb-4">Allow another address to spend your tokens</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spender Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={approvalSpender}
                onChange={(e) => setApprovalSpender(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {approvalSpender && !isAddress(approvalSpender) && (
                <p className="mt-2 text-sm text-red-600">Invalid address</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approval Amount
              </label>
              <input
                type="number"
                placeholder="0.0"
                value={approvalAmount}
                onChange={(e) => setApprovalAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-600">Amount the spender can use</p>
            </div>

            <button
              onClick={handleApprove}
              disabled={!approvalSpender || !approvalAmount || !isAddress(approvalSpender) || isApproving}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isApproving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Approving...
                </>
              ) : (
                'Approve'
              )}
            </button>
          </div>
        </div>

        {/* Check Allowance */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Allowance</h2>
          <p className="text-gray-600 mb-4">View how much a spender can use</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spender Address
              </label>
              <input
                type="text"
                placeholder="0x..."
                value={checkSpender}
                onChange={(e) => setCheckSpender(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {checkSpender && !isAddress(checkSpender) && (
                <p className="mt-2 text-sm text-red-600">Invalid address</p>
              )}
            </div>

            {allowanceData !== undefined && decimals && isAddress(checkSpender) && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-lg">Allowance:</span>
                  <span className="text-3xl font-bold text-blue-600">
                    {formatUnits(allowanceData, decimals)} {symbol}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Burn Tokens */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Burn Tokens</h2>
          <p className="text-gray-600 mb-4">Permanently destroy tokens</p>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-red-800">
                Warning: Burning tokens is permanent and cannot be undone. Burned tokens are removed from circulation forever.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Burn
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  onClick={setMaxBurn}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 font-semibold text-sm hover:text-red-700"
                >
                  MAX
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Balance: {balance && decimals ? formatUnits(balance, decimals) : '0'} {symbol || ''}
              </p>
            </div>

            <button
              onClick={handleBurn}
              disabled={!burnAmount || isBurning}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isBurning ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Burning...
                </>
              ) : (
                'Burn Tokens'
              )}
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex">
            <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-2">Token Operations Guide:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Transfer:</strong> Send tokens to another address</li>
                <li><strong>Approve:</strong> Allow contracts/addresses to spend your tokens (required for staking)</li>
                <li><strong>Check Allowance:</strong> View approved spending amount for an address</li>
                <li><strong>Burn:</strong> Permanently destroy tokens to reduce supply</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}