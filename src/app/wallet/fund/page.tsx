"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FundPage() {
  const options = [
    {
      title: "Buy crypto",
      description: "Card, bank transfer or a provider",
      link: "/wallet/fund/buy",
    },
    {
      title: "Deposit from an exchange",
      description: "From Binance or Coinbase",
      link: "/wallet/fund/exchange",
    },
    {
      title: "Receive from another wallet",
      description: "QR Code and wallet addresses",
      link: "/wallet/fund/receive",
    },
    {
      title: "Buy locally",
      description: "From users near you (P2P)",
      link: "/wallet/fund/p2p",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-gray-800">
        <Link href="/wallet" className="p-2 rounded-full hover:bg-gray-800">
          <ArrowLeft className="text-white" size={20} />
        </Link>
        <h1 className="text-lg font-semibold text-center flex-1">Fund</h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Detected section */}
        <div>
          <h2 className="text-gray-400 text-sm mb-2">Detected:</h2>
          <div className="bg-[#1a1a1a] p-4 rounded-xl flex items-center justify-between">
            <span className="text-white">G Pay (Google Pay)</span>
            <button className="text-[#49ff91] font-medium">Use</button>
          </div>
        </div>

        {/* Options section */}
        <div>
          <h2 className="text-gray-400 text-sm mb-2">All options:</h2>
          <div className="space-y-3">
            {options.map((opt, idx) => (
              <Link
                href={opt.link}
                key={idx}
                className="bg-[#1a1a1a] p-4 rounded-xl flex justify-between items-center hover:bg-[#222] transition-colors"
              >
                <div>
                  <p className="text-white font-medium">{opt.title}</p>
                  <p className="text-gray-400 text-sm">{opt.description}</p>
                </div>
                <span className="text-gray-500 text-lg">&gt;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
