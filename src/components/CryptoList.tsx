"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PopularSection() {
  const [activeTab, setActiveTab] = useState<"crypto" | "nft">("crypto");
  const router = useRouter();
  const [coins, setCoins] = useState<any[]>([]);
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "crypto") {
          const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
          );
          const data = await res.json();
          setCoins(data);
        } else {
          const res = await fetch(
            "https://api.coingecko.com/api/v3/nfts/list?per_page=10&page=1"
          );
          const data = await res.json();
          setNfts(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="w-full py-4">
      {/* Tabs */}
      <div className="flex justify-start gap-10 border-b border-gray-700 mb-4">
        <button
          onClick={() => setActiveTab("crypto")}
          className={`px-4 py-2 font-semibold hover:bg-[#242424] ${
            activeTab === "crypto"
              ? "text-white border-b-2 border-[#49ff91]"
              : "text-gray-400"
          }`}
        >
          Crypto
        </button>
        <button
          onClick={() => setActiveTab("nft")}
          className={`px-4 py-2 font-semibold hover:bg-[#242424] ${
            activeTab === "nft"
              ? "text-white border-b-2 border-[#49ff91]"
              : "text-gray-400"
          }`}
        >
          NFT
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <ul className="space-y-3 animate-pulse">
          {Array.from({ length: 10 }).map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-[#333333] p-3 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#444444]"></div>
                <div>
                  <div className="w-24 h-3 bg-[#333333] rounded mb-2"></div>
                  <div className="w-12 h-3 bg-[#333333] rounded"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : activeTab === "crypto" ? (
        <ul className="space-y-3">
          {coins.map((coin) => (
            <li
            onClick={() => router.push(`/wallet/coin/${coin.id}`)}
              key={coin.id}
              className="flex items-center justify-between p-3 hover:bg-[#242424]  rounded-xl"
            >
              <div className="flex items-center gap-3">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <p className="text-white font-medium">{coin.name}</p>
                  <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p className="text-white font-semibold">${coin.current_price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-3">
          {nfts.map((nft) => (
            <li
              key={nft.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-[#242424]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-gray-400">
                  NFT
                </div>
                <div>
                  <p className="text-white font-medium">{nft.name}</p>
                  <p className="text-gray-400 text-sm">{nft.asset_platform_id || "N/A"}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
