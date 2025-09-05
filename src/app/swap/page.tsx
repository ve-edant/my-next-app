"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpDown, Search, ChevronLeft } from "lucide-react";
import { CoinListItem } from "@/types/CoinsTypes";

const SwapPage = () => {
  const [fromCoin, setFromCoin] = useState({
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 0,
  });

  const [toCoin, setToCoin] = useState({
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    image:
      "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
    current_price: 0,
  });

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'from' or 'to'
  const [coins, setCoins] = useState<CoinListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopCoins();
  }, []);

  const fetchTopCoins = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
      );
      const data = await response.json();
      setCoins(data);

      // Update default coins with current prices
      const solana = data.find((coin) => coin.id === "solana");
      const usdc = data.find((coin) => coin.id === "usd-coin");

      if (solana) {
        setFromCoin((prev) => ({
          ...prev,
          current_price: solana.current_price,
        }));
      }
      if (usdc) {
        setToCoin((prev) => ({ ...prev, current_price: usdc.current_price }));
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCoinSelect = (coin) => {
    if (modalType === "from") {
      setFromCoin(coin);
    } else {
      setToCoin(coin);
    }
    setShowModal(false);
    setSearchQuery("");
  };

  const handleSwap = () => {
    const tempCoin = fromCoin;
    setFromCoin(toCoin);
    setToCoin(tempCoin);

    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const formatPrice = (price) => {
    if (!price) return "$0.00";
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
  };

  const isContinueEnabled =
    fromAmount &&
    toAmount &&
    parseFloat(fromAmount) > 0 &&
    parseFloat(toAmount) > 0;

  const CoinSelectModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1b1b1b] w-full h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold text-white">
              {modalType === "from" ? "You Pay" : "You Receive"}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#49ff91] focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Coins List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#49ff91]"></div>
            </div>
          ) : (
            <div className="px-4 pb-4">
              {filteredCoins.map((coin) => (
                <div
                  key={coin.id}
                  onClick={() => handleCoinSelect(coin)}
                  className="flex items-center justify-between p-4 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-white">
                        {coin.symbol.toUpperCase()}
                      </div>
                      <div className="text-sm text-gray-400">{coin.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">0</div>
                    <div className="text-sm text-gray-400">$0.00</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#1b1b1b] text-white max-w-lg min-h-screen flex flex-col p-4 justify-between">
      <div className="">
        <h1 className="text-2xl font-bold mb-8 text-center">Swap</h1>
        {/* From Section */}
        <div className="bg-[#2e2e2e] rounded-lg p-4 mb-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400 text-sm">From</span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setModalType("from");
                setShowModal(true);
              }}
              className="flex flex-row items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            >
              <img
                src={fromCoin.image}
                alt={fromCoin.name}
                className="w-12 h-12 rounded-full bg-black"
              />
              <div className="felx flex-row text-left">
                <span className="font-medium">
                  {fromCoin.symbol.toUpperCase()}
                  <br />
                </span>
                <span className="text-sm text-gray-400">{fromCoin.name}</span>
              </div>
            </button>
            <div>
              <input
                type="number"
                placeholder="0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="bg-transparent w-28 text-right text-2xl font-semibold text-white outline-none"
              />
              <div className="text-right text-gray-400 text-sm mt-2">
                ≈{" "}
                {formatPrice(
                  (parseFloat(fromAmount) || 0) * fromCoin.current_price
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center my-4">
          <button
            onClick={handleSwap}
            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition-colors"
          >
            <ArrowUpDown size={20} className="text-white" />
          </button>
        </div>

        {/* To Section */}
        <div className="bg-[#2e2e2e] rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400 text-sm">To</span>
            <span className="text-gray-400 text-sm">Balance: 0</span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setModalType("to");
                setShowModal(true);
              }}
              className="flex flex-row items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            >
              <img
                src={toCoin.image}
                alt={toCoin.name}
                className="w-12 h-12 rounded-full bg-black"
              />
              <div className="flex flex-col text-left">
                <span className="font-medium">
                  {toCoin.symbol.toUpperCase()}
                  <br />
                </span>
                <span className="text-sm text-gray-400">{toCoin.name}</span>
              </div>
            </button>

            <div>
              <input
                type="number"
                placeholder="0"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                className="bg-transparent w-28 text-right text-2xl font-semibold text-white outline-none"
              />
              <div className="text-right text-gray-400 text-sm mt-2">
                ≈{" "}
                {formatPrice(
                  (parseFloat(toAmount) || 0) * toCoin.current_price
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Continue Button */}
      <button
        disabled={!isContinueEnabled}
        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
          isContinueEnabled
            ? "bg-[#49ff91] text-black hover:bg-[#3ee07a] active:scale-[0.98]"
            : "bg-[#30aa61] text-black cursor-not-allowed"
        }`}
      >
        Continue
      </button>

      {showModal && <CoinSelectModal />}
    </div>
  );
};

export default SwapPage;
