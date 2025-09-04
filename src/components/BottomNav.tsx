"use client";

import Link from "next/link";
import { Home, LineChart, ArrowLeftRight, PiggyBank, Compass } from "lucide-react";

const navItems = [
  { icon: <Home />, label: "Home", href: "/" },
  { icon: <LineChart />, label: "Trending", href: "/trending" },
  { icon: <ArrowLeftRight />, label: "Swap", href: "/swap" },
  { icon: <PiggyBank />, label: "Earn", href: "/earn" },
  { icon: <Compass />, label: "Discover", href: "/discover" },
];

export default function BottomNav() {
  return (
    <div className="flex justify-around bg-black border-t border-gray-800 py-3">
      {navItems.map((item, i) => (
        <Link key={i} href={item.href} className="flex flex-col items-center text-gray-400">
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
