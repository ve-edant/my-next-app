"use client";

import { useEffect, useState } from "react";

export default function WalletBalance() {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/wallet/balance");
        const data = await res.json();
        setBalance(typeof data.balance === "number" ? data.balance : 0);
      } catch {
        setBalance(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return <p className="text-gray-400 flex justify-center items-center">Loading balance...</p>;
  }

  return (
    <div className="flex justify-center items-center p-4 rounded-xl text-white w-full">
      <p className="text-2xl text-center font-bold mt-2">
        $ {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}
