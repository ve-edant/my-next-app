// src/components/admin/AddCoinWalletModal.tsx
'use client';

import { useState } from 'react';

interface AddCoinWalletModalProps {
  onClose: () => void;
  onAdd: (data: { geckoId: string; coinName: string; symbol: string; balance: string }) => void;
}

// Available coins (you can expand this list)
const AVAILABLE_COINS = [
  { geckoId: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { geckoId: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { geckoId: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { geckoId: 'solana', name: 'Solana', symbol: 'SOL' },
];

export function AddCoinWalletModal({ onClose, onAdd }: AddCoinWalletModalProps) {
  const [selectedCoin, setSelectedCoin] = useState('');
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoin || !balance) return;

    const coin = AVAILABLE_COINS.find(c => c.geckoId === selectedCoin);
    if (!coin) return;

    setLoading(true);
    await onAdd({
      geckoId: coin.geckoId,
      coinName: coin.name,
      symbol: coin.symbol,
      balance,
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 max-w-lg mx-auto bg-black/50 text-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Add Coin Wallet</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Coin
            </label>
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Choose a coin...</option>
              {AVAILABLE_COINS.map((coin) => (
                <option key={coin.geckoId} value={coin.geckoId}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Balance
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
              disabled={loading || !selectedCoin || !balance}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Adding...' : 'Add Wallet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}