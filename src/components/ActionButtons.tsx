import { ArrowUpRight, ArrowLeftRight, Zap, Landmark } from "lucide-react";
import Link from "next/link";

const actions = [
  { icon: <ArrowUpRight size={32} />, label: "Send", link: "/wallet/send" },
  { icon: <ArrowLeftRight size={32} />, label: "Swap", link: "/swap" },
  { icon: <Zap size={32} />, label: "Fund", isBuy: true, link: "/wallet/fund" }, // ✅ fixed double slash
  { icon: <Landmark size={32} />, label: "Sell", link: "/wallet/sell" },
];

export default function ActionButtons() {
  return (
    <div className="flex items-center justify-center gap-8 mt-6 px-8">
      {actions.map((a, i) => (
        <Link
          href={a.link}
          key={i}
          className="flex flex-col items-center space-y-1"
        >
          <div
            className={`p-4 rounded-2xl ${
              a.isBuy ? "bg-[#49ff91] text-black" : "bg-white/10 text-white"
            }`}
          >
            {a.icon}
          </div>
          <span
            className={`text-md ${
              a.isBuy ? "text-[#49ff91]" : "text-white"
            }`}
          >
            {a.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
