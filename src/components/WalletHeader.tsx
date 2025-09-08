"use client";

import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface CoinWallet {
  id: string;
  geckoId: string | null;
  coinName: string | null;
  symbol: string | null;
  balance: string;
}

export default function WalletHeader() {
  const { user } = useUser();
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      if (!user) return;

      try {
        // Fetch user's coin wallets
        const walletResponse = await fetch('/api/wallet/balance');
        if (!walletResponse.ok) return;
        
        const { coinWallets }: { coinWallets: CoinWallet[] } = await walletResponse.json();
        
        if (coinWallets.length === 0) {
          setTotalValue(0);
          setLoading(false);
          return;
        }

        // Get unique gecko IDs
        const geckoIds = coinWallets
          .map(wallet => wallet.geckoId)
          .filter(id => id !== null)
          .join(',');

        if (!geckoIds) {
          setTotalValue(0);
          setLoading(false);
          return;
        }

        // Fetch live prices
        const priceResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${geckoIds}&vs_currencies=usd`
        );
        
        if (!priceResponse.ok) return;
        
        const priceData = await priceResponse.json();

        // Calculate total value
        let total = 0;
        coinWallets.forEach(wallet => {
          if (wallet.geckoId && priceData[wallet.geckoId]) {
            const balance = parseFloat(wallet.balance);
            const price = priceData[wallet.geckoId].usd;
            total += balance * price;
          }
        });

        setTotalValue(total);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletBalance();

    // Refresh every minute
    const interval = setInterval(fetchWalletBalance, 60000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="flex flex-col px-4 pt-4">
      <div className="flex justify-between">
        <Settings className="text-gray-400 text-left" />
        <h2 className="font-semibold">Main Wallet 1</h2>
        <span className="text-green-400">✨</span>
      </div>
      <div className="flex justify-center items-center p-4 rounded-xl text-white w-full">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-600 rounded"></div>
          </div>
        ) : (
          <p className="text-2xl text-center font-bold mt-2">
            $ {totalValue.toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </p>
        )}
      </div>
    </div>
  );
}