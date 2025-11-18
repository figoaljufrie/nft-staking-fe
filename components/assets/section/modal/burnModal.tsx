"use client";

import ModalLayout from "../../layout/modalLayout";

interface BurnModalProps {
  selectedTokenId: bigint | null;
  isBurning: boolean;
  onClose: () => void;
  onBurn: () => void;
}

export default function BurnModal({
  selectedTokenId,
  isBurning,
  onClose,
  onBurn,
}: BurnModalProps) {
  return (
    <ModalLayout title="BURN_NFT.exe" onClose={onClose}>
      <div className="space-y-6">
        {/* Danger Warning */}
        <div className="bg-red-950/50 border border-red-600/30 p-4">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-red-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p className="text-sm text-red-400 font-mono font-bold mb-1">
                !!! CRITICAL: PERMANENT_DESTRUCTION
              </p>
              <p className="text-xs text-red-500 font-mono">
                Asset will be permanently destroyed. Recovery impossible. No
                rollback available.
              </p>
            </div>
          </div>
        </div>

        {/* Token ID Display */}
        <div className="bg-gray-950 border border-red-600/30 p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-mono text-sm">
              TOKEN_ID_TO_BURN:
            </span>
            <span className="font-bold text-red-400 font-mono">
              #{selectedTokenId?.toString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            disabled={isBurning}
            className="px-6 py-3 bg-gray-900 border border-gray-700 text-gray-400 font-mono hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            ./cancel
          </button>
          <button
            onClick={onBurn}
            disabled={isBurning}
            className="px-6 py-3 bg-gray-950 border-2 border-red-400 text-red-400 font-mono hover:bg-red-400 hover:text-black transition-all disabled:opacity-50 flex items-center justify-center"
          >
            {isBurning ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                DESTROYING...
              </>
            ) : (
              "./destroy"
            )}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}