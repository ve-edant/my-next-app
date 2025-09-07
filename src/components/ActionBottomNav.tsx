import { ArrowUpRight, ArrowLeftRight, Zap, ArrowDownLeft, Landmark } from "lucide-react";

const actions = [
  { icon: <ArrowUpRight size={32} />, label: "Send" },
  { icon: <ArrowDownLeft size={32} />, label: "Receive" },
  { icon: <ArrowLeftRight size={32} />, label: "Swap" },
  { icon: <Zap size={32} />, label: "Buy", isBuy: true },
  { icon: <Landmark size={32} />, label: "Sell" },
];

export default function ActionButtons() {
  return (
    <div className="flex justify-evenly py-3 border-t border-gray-500">
      {actions.map((a, i) => (
        <div key={i} className="flex flex-col items-center space-y-1">
          <div
            className={`p-4 rounded-lg ${
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
        </div>
      ))}
    </div>
  );
}
