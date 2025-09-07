"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
}

export default function SendPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
        setFilteredCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCoins(coins);
    } else {
      setFilteredCoins(
        coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, coins]);

  const handleSelect = (coinId: string) => {
    setSelectedCoin(coinId);
    router.push(`/wallet/buy/${coinId}`);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>
        <h1 className="text-xl font-bold text-center flex-1">Send</h1>
        <div className="w-16"></div> {/* Spacer for centering */}
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#242424] text-white border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4">
        {loading ? (
          <div className="">
            {/* Skeleton Loader */}
            <ul className="space-y-3 animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    {/* Circle for coin image */}
                    <div className="w-10 h-10 rounded-full bg-[#333333]"></div>
                    <div>
                      {/* Coin name skeleton */}
                      <div className="w-24 h-4 bg-[#333333] rounded mb-2"></div>
                      {/* Symbol skeleton */}
                      <div className="w-12 h-4 bg-[#333333] rounded"></div>
                    </div>
                  </div>
                  {/* Radio button skeleton */}
                  <div className="w-5 h-5 rounded-full bg-[#333333]"></div>
                </li>
              ))}
            </ul>
          </div>
        ) : filteredCoins.length === 0 ? (
          <p className="text-gray-400 text-center">No coins found</p>
        ) : (
          <ul className="space-y-1">
            {filteredCoins.map((coin) => (
              <li
                onClick={() => router.push(`/wallet/coin/${coin.id}`)}
                key={coin.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#242424] transition"
              >
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  <div>
                    <p className="font-semibold">{coin.name}</p>
                    <p className="text-sm text-gray-400 uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="selectedCoin"
                  checked={selectedCoin === coin.id}
                  onChange={() => handleSelect(coin.id)}
                  className="w-5 h-5 accent-blue-500"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
