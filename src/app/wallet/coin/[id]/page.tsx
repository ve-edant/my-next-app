"use client";
import { useState, useEffect, use } from "react";
import { ChevronLeft, ExternalLink, Repeat, ShoppingCart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DottedLineChart } from "@/components/ui/dotted-line";
import { CoinData } from "@/types/CoinsTypes";

interface CoinId {
  coinId: string;
}

const CoinInfoPage = () => {
  const router = useRouter();
  const params = useParams();
  const coinId = String(params.id);
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoinData();
  }, []);

  const fetchCoinData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      if (!res.ok) throw new Error("Failed to fetch coin data");
      const data = await res.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#1b1b1b] text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#49ff91]"></div>
      </div>
    );
  }

  if (!coinData) {
    return (
      <div className="bg-[#1b1b1b] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Failed to load coin data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1b1b1b] text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <div className="text-lg font-semibold">
            {coinData.symbol.toUpperCase()}
          </div>
          <div className="text-sm text-gray-400">
            {coinData.name} |{" "}
            {coinData?.asset_platform_id?.toUpperCase() ||
              coinData.symbol.toUpperCase()}
          </div>
        </div>
        <div className="w-6"></div>
      </div>

      {/* Coin Info Row */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={coinData?.image?.large}
            alt={coinData.name}
            className="w-12 h-12 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold break-words leading-tight">
              {coinData.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <DottedLineChart coinId={coinId} currency="usd" />

      {/* Action Buttons */}
      <div className="mx-auto my-2">
        <div className="flex gap-8 justify-center">
          {/* Swap */}
          <div className="flex flex-col items-center gap-2">
            <button className="w-14 h-14 flex items-center justify-center bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors">
              <Repeat size={22} />
            </button>
            <span className="text-md text-gray-300">Swap</span>
          </div>

          {/* Buy */}
          <div className="flex flex-col items-center gap-2">
            <button className="w-14 h-14 flex items-center justify-center bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors">
              <ShoppingCart size={22} />
            </button>
            <span className="text-md text-gray-300">Buy</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-semibold mb-4">Stats</h2>

        <div className="space-y-3 bg-[#242424] p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-200">Market Cap</span>
            <span className="text-white">
              {coinData.market_data?.market_cap?.usd?.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-200">Circulating Supply</span>
            <span className="text-white">
              {coinData.market_data?.circulating_supply?.toLocaleString()}{" "}
              {coinData.symbol.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-200">Total Supply</span>
            <span className="text-white">
              {coinData.market_data?.total_supply?.toLocaleString()}{" "}
              {coinData.symbol.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Contract Address */}
        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-md font-semibold mb-3">Contract Address</h3>
          <div className="flex  bg-[#242424] p-4 rounded-lg justify-between items-center">
            <span className="text-gray-200">
              {coinData?.asset_platform_id
                ? coinData.asset_platform_id.charAt(0).toUpperCase() +
                  coinData.asset_platform_id.slice(1)
                : coinData?.symbol?.toUpperCase()}
            </span>

            <span
              className="text-white"
              onClick={() => {
                if (coinData.contract_address) {
                  navigator.clipboard.writeText(coinData.contract_address);
                }
              }}
            >
              {coinData.contract_address
                ? `${coinData.contract_address.slice(
                    0,
                    6
                  )}...${coinData.contract_address.slice(-4)}`
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-md font-semibold mb-3">Links</h3>
          <div className="space-y-3 flex flex-row gap-2">
            <div className="flex items-center gap-1">
              {coinData.links?.homepage?.[0] ? (
                <a
                  href={coinData.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#242424] text-[#49ff91] hover:bg-[#2a2a2a] transition-colors"
                >
                  <span>Official Website</span>
                  <ExternalLink size={16} className="text-[#49ff91]" />
                </a>
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {coinData.links?.blockchain_site?.[0] ? (
                <a
                  href={coinData.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#242424] text-[#49ff91] hover:bg-[#2a2a2a] transition-colors"
                >
                  <span>Explorer</span>
                  <ExternalLink size={16} className="text-[#49ff91]" />
                </a>
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>
            <div className="">
              {coinData.links?.twitter_screen_name ? (
                <a
                  href={`https://x.com/${coinData.links.twitter_screen_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#242424] text-[#49ff91] hover:bg-[#2a2a2a] transition-colors"
                >
                  <span>X</span>
                  <ExternalLink size={16} className="text-[#49ff91]" />
                </a>
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInfoPage;
