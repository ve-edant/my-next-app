"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

const CryptoWalletLanding: React.FC = () => {
  const router = useRouter();
  const particlesRef = useRef<HTMLDivElement>(null);

  // Particle system
  useEffect(() => {
    const createParticle = (): void => {
      if (!particlesRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-indigo-400/40 pointer-events-none animate-pulse';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 3 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
      particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      
      particlesRef.current.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 7000);
    };

    const intervalId = setInterval(createParticle, 500);
    return () => clearInterval(intervalId);
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = (): void => {
      const header = document.querySelector('header');
      if (!header) return;
      
      if (window.scrollY > 30) {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      } else {
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.borderBottom = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = (): void => {
    router.push('/sign-in');
  };

  const handleSignUp = (): void => {
    router.push('/sign-up');
  };


  return (
    <div className="overflow-x-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Background particles */}
      <div 
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0" 
      />
      
      {/* Header */}
      <header className="relative z-50 px-4 py-4 transition-all duration-300">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold text-white">Crypto Wallet</div>
              <div className="text-xs text-gray-400 hidden sm:block">Secure • Simple</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSignIn}
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-12">
        <div className="max-w-lg mx-auto text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-sm text-gray-300">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Trusted by 100K+ users
          </div>
          
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Your Gateway to
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DeFi Future
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 leading-relaxed px-4">
              The most secure, intuitive crypto wallet. Trade, stake, and manage your digital assets with confidence.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 px-4">
            <button 
              onClick={handleSignUp}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-2xl hover:shadow-indigo-500/25 group"
            >
              Get Started Free
              <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
            
            <button className="w-full py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-200">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$2.5B+</div>
              <div className="text-xs text-gray-400">Secured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">150+</div>
              <div className="text-xs text-gray-400">Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="max-w-lg mx-auto mt-12 px-4">
          <div className="relative">
            <div className="w-full max-w-xs mx-auto h-[480px] bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-2 shadow-2xl">
              <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative">
                {/* Phone Screen Content */}
                <div className="p-4 space-y-4 text-white">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-white"></div>
                      <div className="w-1 h-1 rounded-full bg-white"></div>
                      <div className="w-1 h-1 rounded-full bg-white/50"></div>
                    </div>
                    <div>100%</div>
                  </div>
                  
                  {/* Wallet Balance */}
                  <div className="text-center space-y-2 pt-6">
                    <div className="text-xs opacity-70">Total Balance</div>
                    <div className="text-2xl font-bold">$24,563.89</div>
                    <div className="text-green-400 text-xs">+12.5% (24h)</div>
                  </div>
                  
                  {/* Crypto Cards */}
                  <div className="space-y-3 mt-6">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">₿</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">Bitcoin</div>
                        <div className="text-xs opacity-70">2.5 BTC</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">$18,450</div>
                        <div className="text-green-400 text-xs">+5.2%</div>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">E</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">Ethereum</div>
                        <div className="text-xs opacity-70">12.8 ETH</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">$5,120</div>
                        <div className="text-green-400 text-xs">+3.8%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-sm font-semibold hover:bg-indigo-700 transition-colors duration-200">Send</button>
                    <button className="flex-1 py-2.5 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-sm font-semibold hover:bg-white/20 transition-colors duration-200">Receive</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 animate-bounce opacity-60"></div>
            <div className="absolute top-20 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 animate-pulse opacity-40"></div>
            <div className="absolute -bottom-4 left-8 w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 animate-ping opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
            <p className="text-gray-600">Built for the next generation of DeFi enthusiasts</p>
          </div>
          
          <div className="space-y-6">
            {/* Feature Cards */}
            {[
              {
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                title: "Bank-Grade Security",
                description: "Multi-layer encryption and biometric authentication protect your assets 24/7.",
                gradient: "from-indigo-500 to-purple-600"
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Lightning Fast",
                description: "Execute trades and transfers in seconds with optimized infrastructure.",
                gradient: "from-green-500 to-teal-600"
              },
              {
                icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z",
                title: "Advanced Analytics",
                description: "Real-time portfolio tracking and market insights to maximize gains.",
                gradient: "from-orange-500 to-red-600"
              },
              {
                icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                title: "Multi-Chain Support",
                description: "Manage assets across Ethereum, BSC, Polygon, and 50+ networks.",
                gradient: "from-blue-500 to-cyan-600"
              },
              {
                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                title: "24/7 Support",
                description: "Expert support team available around the clock via chat and email.",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                title: "DeFi Integration",
                description: "Access yield farming and staking directly from your wallet.",
                gradient: "from-yellow-500 to-orange-600"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="max-w-lg mx-auto text-center px-4 space-y-6">
          <h2 className="text-3xl font-bold text-white">Ready to Start?</h2>
          <p className="text-gray-300">Join millions who trust Crypto Wallet. Get started in under 2 minutes.</p>
          
          <div className="space-y-4 pt-4">
            <button 
              onClick={handleSignUp}
              className="w-full py-4 rounded-2xl bg-white text-indigo-900 font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-2xl"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-lg mx-auto px-4 space-y-8">
          {/* Brand */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Crypto Wallet</span>
            </div>
            <p className="text-sm text-center">The most trusted crypto wallet for the modern world.</p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Product</h3>
              <div className="space-y-2">
                <button onClick={() => router.push('/wallet')} className="block hover:text-white transition-colors duration-200">Wallet</button>
                <button onClick={() => router.push('/swap')} className="block hover:text-white transition-colors duration-200">Swap</button>
                <button onClick={() => router.push('/earn')} className="block hover:text-white transition-colors duration-200">Earn</button>
                <button onClick={() => router.push('/trending')} className="block hover:text-white transition-colors duration-200">Trending</button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-white">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors duration-200">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors duration-200">Contact Us</a>
                <a href="#" className="block hover:text-white transition-colors duration-200">Security</a>
                <a href="#" className="block hover:text-white transition-colors duration-200">Legal</a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-sm">© 2024 Crypto Wallet. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CryptoWalletLanding;