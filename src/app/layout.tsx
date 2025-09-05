import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BottomNav from "../components/BottomNav";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trust Wallet",
  description: "Crypto Wallet App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className + " text-white"}>
          <div className="flex flex-col max-w-lg h-screen mx-auto bg-black">
            {/* Header with Clerk auth */}
            <header className="flex justify-end items-center p-4 gap-4 h-16 border-b border-gray-800">
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

            {/* Bottom navigation */}
            <BottomNav />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
