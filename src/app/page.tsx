"use client";

import WalletHeader from "@/components/WalletHeader";
import ActionButtons from "@/components/ActionButtons";
import CryptoList from "@/components/CryptoList";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  // Debug each import
  console.log('WalletHeader:', WalletHeader, typeof WalletHeader);
  console.log('ActionButtons:', ActionButtons, typeof ActionButtons);
  console.log('CryptoList:', CryptoList, typeof CryptoList);
  console.log('BottomNav:', BottomNav, typeof BottomNav);

  return (
    <div className="flex flex-col min-h-screen bg-[#1b1b1b] text-white">
      <WalletHeader />
      <ActionButtons />
      <div className="flex-1 overflow-y-auto px-4">
        <CryptoList />
      </div>
    
    </div>
  );
}
