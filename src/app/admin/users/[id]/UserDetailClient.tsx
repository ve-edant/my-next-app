// src/app/admin/users/[id]/UserDetailClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AddCoinWalletModal } from '@/components/admin/AddCoinWalletModal';
import { EditBalanceModal } from '@/components/admin/EditBalanceModal';

interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt: string;
}

interface CoinWallet {
  id: string;
  geckoId: string;
  coinName: string;
  symbol: string;
  balance: string;
  createdAt: string;
}

interface UserDetailClientProps {
  id: string;
}

export default function UserDetailClient({ id }: UserDetailClientProps) {
  const [user, setUser] = useState<User | null>(null);
  const [coinWallets, setCoinWallets] = useState<CoinWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingWallet, setEditingWallet] = useState<CoinWallet | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchUserData();
      fetchCoinWallets();
    }
  }, [id]);

  const fetchUserData = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/admin/users/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const userData = data.user;

      if (userData && typeof userData === 'object') {
        setUser({
          id: userData.id || '',
          email: userData.email || '',
          firstName: userData.firstName || null,
          lastName: userData.lastName || null,
          createdAt: userData.createdAt || new Date().toISOString()
        });

      } else {
        throw new Error('Invalid user data received');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to load user data');
    }
  };

  const fetchCoinWallets = async () => {
    try {
      const response = await fetch(`/api/admin/users/${id}/coin-wallets`);
      
      if (!response.ok) {
        // If 404, it might just mean no coin wallets exist, which is fine
        if (response.status === 404) {
          setCoinWallets([]);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched coin wallets:', data);
      
      
      // Ensure we always have an array
      if (Array.isArray(data)) {
        setCoinWallets(data);
      } else if (data && typeof data === 'object' && Array.isArray(data.coinWallets)) {
        setCoinWallets(data.coinWallets);
      } else {
        setCoinWallets([]);
      }
    } catch (error) {
      console.error('Error fetching coin wallets:', error);
      setCoinWallets([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoinWallet = async (walletData: {
    geckoId: string;
    coinName: string;
    symbol: string;
    balance: string;
  }) => {
    try {
      const response = await fetch(`/api/admin/users/${id}/coin-wallets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(walletData),
      });

      if (response.ok) {
        await fetchCoinWallets(); // Refresh the list
        setShowAddModal(false);
      } else {
        const error = await response.json();
        alert(error?.error || 'Failed to add coin wallet');
      }
    } catch (error) {
      console.error('Error adding coin wallet:', error);
      alert('Failed to add coin wallet');
    }
  };

  const handleEditBalance = async (newBalance: string) => {
    if (!editingWallet) return;

    try {
      const response = await fetch(`/api/admin/coin-wallets/${editingWallet.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balance: newBalance }),
      });

      if (response.ok) {
        await fetchCoinWallets(); // Refresh the list
        setShowEditModal(false);
        setEditingWallet(null);
      } else {
        const error = await response.json();
        alert(error?.error || 'Failed to update balance');
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      alert('Failed to update balance');
    }
  };

  const handleDeleteWallet = async (walletId: string) => {
    if (!confirm('Are you sure you want to delete this coin wallet?')) return;

    try {
      const response = await fetch(`/api/admin/coin-wallets/${walletId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCoinWallets(); // Refresh the list
      } else {
        alert('Failed to delete coin wallet');
      }
    } catch (error) {
      console.error('Error deleting wallet:', error);
      alert('Failed to delete coin wallet');
    }
  };

  const getUserInitial = (user: User | null): string => {
    if (!user) return 'U';
    
    if (user.firstName && user.firstName.length > 0) {
      return user.firstName[0].toUpperCase();
    }
    
    if (user.email && user.email.length > 0) {
      return user.email[0].toUpperCase();
    }
    
    return 'U';
  };

  const getUserDisplayName = (user: User | null): string => {
    if (!user) return 'Unknown User';
    
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    
    return fullName || 'No name set';
  };

  if (loading) {
    return (
      <div className="max-w-lg mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{error || 'User not found'}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg border-gray-700 border mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-3 p-1 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
              <p className="text-sm text-gray-800">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {getUserInitial(user)}
              </span>
            </div>
            <div>
              <h2 className="font-medium text-gray-900">
                {getUserDisplayName(user)}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Coin Wallets Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Coin Wallets ({coinWallets.length})
            </h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Add Coin
            </button>
          </div>

          <div className="space-y-3">
            {coinWallets.length > 0 ? (
              coinWallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-medium text-xs">
                          {wallet.symbol?.toUpperCase() || 'C'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{wallet.coinName || 'Unknown Coin'}</h4>
                        <p className="text-sm text-gray-500">{(wallet.symbol || '').toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{wallet.balance || '0'}</p>
                      <p className="text-xs text-gray-500">{(wallet.symbol || '').toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                    <button
                      onClick={() => {
                        setEditingWallet(wallet);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit Balance
                    </button>
                    <button
                      onClick={() => handleDeleteWallet(wallet.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">No coin wallets yet</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Add a coin wallet to get started with crypto balances
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Add Your First Coin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddCoinWalletModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCoinWallet}
        />
      )}

      {showEditModal && editingWallet && (
        <EditBalanceModal
          wallet={editingWallet}
          onClose={() => {
            setShowEditModal(false);
            setEditingWallet(null);
          }}
          onSave={handleEditBalance}
        />
      )}
    </div>
  );
}