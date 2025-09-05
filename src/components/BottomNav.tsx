"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LineChart, ArrowLeftRight, PiggyBank, Compass } from "lucide-react";

const navItems = [
  { icon: <Home size={20} />, label: "Home", href: "/" },
  { icon: <LineChart size={20} />, label: "Trending", href: "/trending" },
  { icon: <ArrowLeftRight size={20} />, label: "Swap", href: "/swap" },
  { icon: <PiggyBank size={20} />, label: "Earn", href: "/earn" },
  { icon: <Compass size={20} />, label: "Discover", href: "/discover" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="flex justify-around bg-black border-t border-gray-800 py-3">
      {navItems.map((item, i) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={i}
            href={item.href}
            className={`flex flex-col items-center ${
              isActive ? "text-[#49ff91]" : "text-gray-400"
            } transition-colors`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
