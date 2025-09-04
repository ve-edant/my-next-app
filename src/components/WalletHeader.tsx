import { Settings } from "lucide-react";

export default function WalletHeader() {
  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <Settings className="text-gray-400" />
      <h2 className="font-semibold">Main Wallet 1</h2>
      <span className="text-green-400">✨</span>
    </div>
  );
}
