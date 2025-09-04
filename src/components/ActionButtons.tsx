import { ArrowUpRight, ArrowLeftRight, Banknote, Zap } from "lucide-react";

const actions = [
  { icon: <ArrowUpRight />, label: "Send" },
  { icon: <ArrowLeftRight />, label: "Swap" },
  { icon: <Zap />, label: "Fund" },
  { icon: <Banknote />, label: "Sell" },
];

export default function ActionButtons() {
  return (
    <div className="flex justify-around mt-6 px-4">
      {actions.map((a, i) => (
        <div key={i} className="flex flex-col items-center space-y-1">
          <div className="p-3 bg-white/10 rounded-full">{a.icon}</div>
          <span className="text-sm">{a.label}</span>
        </div>
      ))}
    </div>
  );
}
