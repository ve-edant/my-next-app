"use client";

import { useEffect, useState } from "react";

export default function WalletBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/wallet/balance");
        if (!res.ok) {
          throw new Error("Failed to fetch balance");
        }
        const data = await res.json();
        setBalance(data.balance);
      } catch (err: any) {
        setError(err.message);
        setBalance(0.00);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) return <p className="text-gray-400  flex justify-center items-center">Loading balance...</p>;
  if (error) return <p className="text-red-500 flex justify-center items-center">Error: {error}</p>;

  return (
    <div className=" flex justify-center items-center p-4 rounded-xl text-white w-full">
      <p className="text-2xl text-center font-bold mt-2">$ {balance?.toLocaleString()}</p>
    </div>
  );
}
