import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNav from "../components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Wallet",
  description: "Crypto Wallet App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-black text-white"}>
        <div className="flex flex-col max-w-xl mx-auto">
          <div className="flex-1 overflow-y-auto">{children}</div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
