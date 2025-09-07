"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import BottomNav from "./BottomNav";
import ActionBottomNav from "./ActionBottomNav";

function BottomNavSkeleton() {
  return (
    <div className="flex justify-around items-center h-24 border-t border-gray-400">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-16 h-16 rounded-2xl bg-[#242424] animate-pulse"
        />
      ))}
    </div>
  );
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // simulate a short transition/loading effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300); // 300ms shimmer
    return () => clearTimeout(timer);
  }, [pathname]);

  const useActionNav =
    pathname?.startsWith("/trending/coin") || pathname?.startsWith("/wallet/coin");

  return (
    <div className="flex flex-col max-w-lg h-screen mx-auto bg-[#1a1a1a]">
      {/* Header */}
      <header className="flex justify-end items-center p-4 gap-4 h-16 bg-black border-b border-gray-800">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-lg bg-[#49ff91] text-black font-medium hover:bg-[#3ee07a] transition-colors">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition-colors">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>

      {/* Page content */}
      <div className="flex-1 overflow-y-auto">{children}</div>

      {/* Bottom navigation with shimmer */}
      {loading ? (
        <BottomNavSkeleton />
      ) : useActionNav ? (
        <ActionBottomNav />
      ) : (
        <BottomNav />
      )}
    </div>
  );
}
