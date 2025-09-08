"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface CoinWallet {
  id: string;
  geckoId: string | null;
  coinName: string | null;
  symbol: string | null;
  balance: string;
}

interface CoinWithPrice extends CoinWallet {
  currentPrice: number;
  dollarValue: number;
  change24h: number;
  image: string | null;
}

export default function CryptoList() {
  const { user } = useUser();
  const [coins, setCoins] = useState<CoinWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchWalletCoins = async () => {
      if (!user) return;

      try {
        // Fetch user's coin wallets
        const walletResponse = await fetch('/api/wallet/balance');
        if (!walletResponse.ok) {
          setLoading(false);
          return;
        }
        
        const { coinWallets }: { coinWallets: CoinWallet[] } = await walletResponse.json();
        
        if (coinWallets.length === 0) {
          setCoins([]);
          setLoading(false);
          return;
        }

        // Get unique gecko IDs
        const geckoIds = coinWallets
          .map(wallet => wallet.geckoId)
          .filter(id => id !== null)
          .join(',');

        if (!geckoIds) {
          setCoins([]);
          setLoading(false);
          return;
        }

        // Fetch live prices and 24h change
        const priceResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${geckoIds}&vs_currencies=usd&include_24hr_change=true`
        );
        
        const coinDetailsResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${geckoIds}&sparkline=false`
        );

        if (!priceResponse.ok || !coinDetailsResponse.ok) {
          setLoading(false);
          return;
        }
        
        const priceData = await priceResponse.json();
        const coinDetails = await coinDetailsResponse.json();

        // Combine wallet data with live prices
        const coinsWithPrices: CoinWithPrice[] = coinWallets.map(wallet => {
          const geckoId = wallet.geckoId;
          const price = geckoId && priceData[geckoId] ? priceData[geckoId].usd : 0;
          const change24h = geckoId && priceData[geckoId] ? priceData[geckoId].usd_24h_change : 0;
          
          // Find coin details for image
          const coinDetail = coinDetails.find((coin: any) => coin.id === geckoId);
          
          const balance = parseFloat(wallet.balance);
          const dollarValue = balance * price;

          return {
            ...wallet,
            currentPrice: price,
            dollarValue: dollarValue,
            change24h: change24h,
            image: coinDetail?.image || null
          };
        });

        setCoins(coinsWithPrices);
      } catch (error) {
        console.error('Error fetching wallet coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletCoins();

    // Set up interval to refresh prices every minute
    const interval = setInterval(fetchWalletCoins, 60000);
    return () => clearInterval(interval);
  }, [user]);

  const handleCoinClick = (geckoId: string | null) => {
    if (geckoId) {
      router.push(`/wallet/coin/${geckoId}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-4">
        <div className="flex justify-start gap-10 border-b border-gray-700 mb-4">
          <div className="px-4 py-2 font-semibold text-white border-b-2 border-[#49ff91]">
            My Crypto
          </div>
        </div>
        <ul className="space-y-3 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-[#333333] p-3 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#444444]"></div>
                <div>
                  <div className="w-24 h-3 bg-[#444444] rounded mb-2"></div>
                  <div className="w-12 h-3 bg-[#444444] rounded"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-16 h-3 bg-[#444444] rounded mb-2"></div>
                <div className="w-12 h-3 bg-[#444444] rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (coins.length === 0) {
    return (
      <div className="w-full py-4">
        <div className="flex justify-start gap-10 border-b border-gray-700 mb-4">
          <div className="px-4 py-2 font-semibold text-white border-b-2 border-[#49ff91]">
            My Crypto
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-400 mb-2">No cryptocurrencies in your wallet</p>
          <p className="text-gray-500 text-sm">Add some coins to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      {/* Header */}
      <div className="flex justify-start gap-10 border-b border-gray-700 mb-4">
        <div className="px-4 py-2 font-semibold text-white border-b-2 border-[#49ff91]">
          My Crypto
        </div>
      </div>

      {/* Coin List */}
      <ul className="space-y-3">
        {coins.map((coin) => (
          <li
            key={coin.id}
            onClick={() => handleCoinClick(coin.geckoId)}
            className="flex items-center justify-between p-3 hover:bg-[#242424] rounded-xl cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              {coin.image ? (
                <img 
                  src={coin.image} 
                  alt={coin.coinName || 'Coin'} 
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {coin.symbol?.charAt(0) || '?'}
                  </span>
                </div>
              )}
              <div>
                <p className="text-white font-medium">{coin.coinName || 'Unknown'}</p>
                <p className="text-gray-400 text-sm">
                  {parseFloat(coin.balance).toFixed(8)} {coin.symbol?.toUpperCase() || ''}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-white font-semibold">
                ${coin.currentPrice.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: coin.currentPrice < 1 ? 8 : 2 
                })}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-gray-300 text-sm">
                  ${coin.dollarValue.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </p>
                {coin.change24h !== 0 && (
                  <span className={`text-xs px-1 py-0.5 rounded ${
                    coin.change24h >= 0 
                      ? 'text-green-400 bg-green-400/10' 
                      : 'text-red-400 bg-red-400/10'
                  }`}>
                    {coin.change24h >= 0 ? '+' : ''}
                    {coin.change24h.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}