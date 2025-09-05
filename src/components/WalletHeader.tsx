import { Settings } from "lucide-react";
import WalletBalance from "./WalletBalance";

export default function WalletHeader() {
  return (
    <div className="flex flex-col px-4 pt-4">
      <div className="flex justify-between">
        <Settings className="text-gray-400 text-left" />
        <h2 className="font-semibold">Main Wallet 1</h2>
        <span className="text-green-400">✨</span>
      </div>
      <WalletBalance />
    </div>
  );
}
