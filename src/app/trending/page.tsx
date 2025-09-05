"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { CoinListItem } from "@/types/CoinsTypes";
import { useRouter } from "next/navigation";

const TrustWalletTrending = () => {
  const [isTimeFrameOpen, setIsTimeFrameOpen] = useState(false);
  const [timeFrame, setTimeFrame] = useState("24H");
  const [selectedNetwork, setSelectedNetwork] = useState("All");
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [trendingData, setTrendingData] = useState<CoinListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const networks = ["All", "BNB Smart Chain", "Solana", "Ethereum", "Base"];

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const fetchTrendingCoins = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      const data = await response.json();

      const coins: CoinListItem[] = (data.coins || []).map((c: any) => ({
        id: c.item.id,
        name: c.item.name,
        symbol: c.item.symbol,
        large: c.item.large,
        small: c.item.small,
        thumb: c.item.thumb,
        marketCap: c.item.data?.market_cap
          ? Number(c.item.data.market_cap.replace(/[$,]/g, ""))
          : null,
        currentPrice: c.item.data?.price ?? null,
        priceChange24h: c.item.data?.price_change_percentage_24h?.usd ?? null,
      }));

      setTrendingData(coins);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatMarketCap = (marketCap: number | null) => {
    if (!marketCap) return "N/A";
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(1)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(1)}M`;
    if (marketCap >= 1e3) return `$${(marketCap / 1e3).toFixed(1)}K`;
    return `$${marketCap.toFixed(2)}`;
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "$0.00";
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
  };

  const formatPriceChange = (change: number | null) => {
    if (!change && change !== 0) return "0.00%";
    const isPositive = change >= 0;
    return `${isPositive ? "+" : ""}${change.toFixed(2)}%`;
  };

  const getPriceChangeColor = (change: number | null) => {
    if (!change && change !== 0) return "text-gray-400";
    return change >= 0 ? "text-green-400" : "text-red-400";
  };

  const NoDataFound = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-4">🛸</div>
      <p className="text-gray-400 text-lg">No data found</p>
    </div>
  );

  const NetworkModal = () => (
    <div className="fixed inset-0 max-w-lg mx-auto bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1b1b1b] w-full h-full flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Select Network</h2>
            <button
              onClick={() => setShowNetworkModal(false)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>
        <div className="flex-1 p-6">
          {networks.map((network) => (
            <div
              key={network}
              onClick={() => {
                setSelectedNetwork(network);
                setShowNetworkModal(false);
              }}
              className={`p-4 rounded-lg cursor-pointer mb-3 transition-colors ${
                selectedNetwork === network
                  ? "bg-[#49ff91] bg-opacity-10 border border-[#49ff91]"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <span
                className={`${
                  selectedNetwork === network ? "text-[#49ff91]" : "text-white"
                }`}
              >
                {network}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (selectedNetwork !== "All") {
    return (
      <div className="bg-[#1b1b1b] text-white min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Trending Tokens</h1>

        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center bg-gray-800 rounded-lg p-1">
            {["24H", "1H"].map((option) => (
              <button
                key={option}
                onClick={() => setTimeFrame(option)}
                className={`px-4 py-2 rounded-md transition-colors relative ${
                  timeFrame === option
                    ? "text-[#49ff91] border border-[#49ff91] bg-[#49ff91] bg-opacity-10"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-6 bg-gray-600"></div>
          </div>

          <button
            onClick={() => setShowNetworkModal(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedNetwork === "All"
                ? "bg-gray-800 text-white"
                : "bg-[#49ff91] bg-opacity-10 border border-[#49ff91] text-[#49ff91]"
            }`}
          >
            {selectedNetwork}
            <ChevronDown size={16} />
          </button>
        </div>

        <NoDataFound />

        {showNetworkModal && <NetworkModal />}
      </div>
    );
  }

  return (
    <div className="bg-[#1b1b1b] text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Trending Tokens</h1>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center p-1 relative">
          {/* Button to open modal */}
          <button
            onClick={() => setIsTimeFrameOpen(true)}
            className="px-4 py-2 bg-[#49ff91] text-black rounded-full font-medium  cursor-pointer"
          >
            {timeFrame}
            <ChevronDown size={16} className="inline-block ml-1 cursor-pointer" />
          </button>

          {/* Modal */}
          {isTimeFrameOpen && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-end justify-center z-50">
              <div className="bg-[#1b1b1b] rounded-t-lg p-6 max-w-lg w-full">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Select Timeframe</h2>
                  <button
                    onClick={() => setIsTimeFrameOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-3 justify-center">
                  {["24H", "1H"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center justify-between px-6 py-3 rounded-md bg-[#353535] text-white cursor-pointer"
                    >
                      <span>{option}</span>
                      <input
                        type="radio"
                        name="timeframe"
                        value={option}
                        checked={timeFrame === option}
                        onChange={() => {
                          setTimeFrame(option);
                          setIsTimeFrameOpen(false);
                        }}
                        className="form-radio text-red-500 focus:ring-red-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowNetworkModal(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            selectedNetwork === "All"
              ? "bg-gray-800 text-white"
              : "bg-[#49ff91] bg-opacity-10 border border-[#49ff91] text-[#49ff91]"
          }`}
        >
          {selectedNetwork}
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Table Headers */}
      <div className="flex flex-row justify-between items-center mb-4 text-gray-400 text-sm font-medium">
        <div>Volume</div>
        <div>Price Change</div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#49ff91]"></div>
        </div>
      ) : (
        /* Trending Coins List */
        <div className="space-y-2">
          {trendingData.map((coin, index) => (
            <div onClick={() => router.push(`/trending/coin/${coin.id}`)} key={coin.id} className="bg-[#1b1b1b] px-4 py-2 cursor-pointer hover:bg-[#242424]">
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* Volume Column */}
                <div className="flex items-center gap-3">
                  <img
                    src={coin.large}
                    alt={coin.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-white">{coin.name}</div>
                    <div className="text-sm text-gray-400">
                      {formatMarketCap(
                        coin.market_cap_rank
                          ? coin.market_cap_rank * 1000000
                          : Math.random() * 1000000000
                      )}
                    </div>
                  </div>
                </div>

                {/* Price Change Column */}
                <div className="text-right">
                  <div className="text-white font-medium">
                    {formatPrice(
                      coin.price_btc
                        ? coin.price_btc * 50000
                        : Math.random() * 100
                    )}
                  </div>
                  <div
                    className={`text-sm ${getPriceChangeColor(
                      timeFrame === "24H"
                        ? (Math.random() - 0.5) * 20
                        : (Math.random() - 0.5) * 10
                    )}`}
                  >
                    {formatPriceChange(
                      timeFrame === "24H"
                        ? (Math.random() - 0.5) * 20
                        : (Math.random() - 0.5) * 10
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showNetworkModal && <NetworkModal />}
    </div>
  );
};

export default TrustWalletTrending;
