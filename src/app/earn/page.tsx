import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Page() {
  const stablecoins = [
    {
      symbol: 'USDT',
      name: 'Ethereum',
      apy: '5.17%',
      bonus: true,
      icon: '₮',
      bgColor: 'bg-green-500'
    },
    {
      symbol: 'USDC',
      name: 'Ethereum',
      apy: '5.66%',
      bonus: true,
      icon: '$',
      bgColor: 'bg-blue-500'
    },
    {
      symbol: 'USDA',
      name: 'Ethereum',
      apy: '8.05%',
      bonus: false,
      icon: 'U',
      bgColor: 'bg-green-500'
    }
  ];

  const nativeStaking = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      apr: '2.88%',
      stakers: 'Over 45K stakers',
      icon: '◊',
      bgColor: 'bg-gray-600'
    },
    {
      symbol: 'BNB',
      name: 'Smart Chain',
      apr: '1.25%',
      icon: '◆',
      bgColor: 'bg-yellow-500'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      apr: '7.24%',
      icon: '◉',
      bgColor: 'bg-gradient-to-br from-purple-400 to-blue-500'
    },
    {
      symbol: 'TRX',
      name: 'Tron',
      apr: '4.08%',
      icon: '▲',
      bgColor: 'bg-red-500'
    },
    {
      symbol: 'DOT',   
      apr: '15.1%',
      icon: '●',
      bgColor: 'bg-pink-500'
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen max-w-lg mx-auto">
      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-8 py-6 border-b border-gray-700">
        <div className="text-center">
          <div className="text-green-400 font-medium border-b-2 border-green-400 pb-2">Earn Hub</div>
        </div>
        <div className="text-gray-400 cursor-pointer hover:text-white transition-colors">Launchpool</div>
        <div className="text-gray-400 cursor-pointer hover:text-white transition-colors">My Earnings</div>
      </div>

      {/* ETH Staking Banner */}
      <div className="mx-4 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 relative overflow-hidden cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">💎</span>
              </div>
              <div>
                <div className="font-medium">Stake your ETH & start earning</div>
                <div className="text-green-300 text-sm">Learn more</div>
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5" />
        </div>
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-400 opacity-20 rounded-full"></div>
        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-purple-400 opacity-20 rounded-full"></div>
      </div>

      {/* Stablecoin Earn Section */}
      <div className="mx-4 mt-8">
        <div className="flex items-center justify-between mb-4 cursor-pointer">
          <div>
            <h2 className="text-xl font-bold">Stablecoin Earn</h2>
            <p className="text-gray-400 text-sm">Earn stablecoin with flexibility and low risk</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {stablecoins.map((coin, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0 cursor-pointer hover:bg-gray-800 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={`w-10 h-10 ${coin.bgColor} rounded-full flex items-center justify-center text-white font-bold`}>
                  {coin.icon}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">E</span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white">{coin.symbol}</span>
                  {coin.bonus && (
                    <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                      <span className="mr-1">◆</span>Bonus
                    </span>
                  )}
                </div>
                <div className="text-gray-400 text-sm">{coin.name}</div>
              </div>
            </div>
            <div className="text-green-400 font-medium text-right">
              <div>{coin.apy}</div>
              <div className="text-xs text-gray-400">APY</div>
            </div>
          </div>
        ))}
      </div>

      {/* Native Staking Section */}
      <div className="mx-4 mt-8">
        <div className="flex items-center justify-between mb-4 cursor-pointer">
          <div>
            <h2 className="text-xl font-bold">Native Staking</h2>
            <p className="text-gray-400 text-sm">Stake and Delegate coins to earn rewards</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {nativeStaking.map((coin, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0 cursor-pointer hover:bg-gray-800 rounded-lg px-2 -mx-2 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={`w-10 h-10 ${coin.bgColor} rounded-full flex items-center justify-center text-white font-bold`}>
                  {coin.icon}
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-white">{coin.symbol}</span>
                  {coin.stakers && (
                    <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                      <span className="mr-1">👥</span>{coin.stakers}
                    </span>
                  )}
                </div>
                <div className="text-gray-400 text-sm">{coin.name}</div>
              </div>
            </div>
            <div className="text-green-400 font-medium text-right">
              <div>{coin.apr}</div>
              <div className="text-xs text-gray-400">APR</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}