// src/components/admin/EditBalanceModal.tsx
"use client";

import { useState } from "react";

interface CoinWallet {
  id: string;
  geckoId: string;
  coinName: string;
  symbol: string;
  balance: string;
}

interface EditBalanceModalProps {
  wallet: CoinWallet;
  onClose: () => void;
  onSave: (newBalance: string) => void;
}

export function EditBalanceModal({
  wallet,
  onClose,
  onSave,
}: EditBalanceModalProps) {
  const [balance, setBalance] = useState(wallet.balance);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!balance) return;

    setLoading(true);
    await onSave(balance);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 max-w-lg mx-auto bg-black/50 text-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Balance
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-medium text-xs">
                  {wallet.symbol}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{wallet.coinName}</h3>
                <p className="text-sm text-gray-500">
                  {wallet.symbol.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Balance
            </label>
            <input
              type="number"
              step="0.00000001"
              min="0"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00000000"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Current balance: {wallet.balance} {wallet.symbol.toUpperCase()}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !balance}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
