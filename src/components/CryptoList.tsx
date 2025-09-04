const cryptos = [
  { name: "Bitcoin", symbol: "BTC", price: "$110,433.94", change: "-0.47%", color: "text-red-400" },
  { name: "Dogecoin", symbol: "DOGE", price: "$0.21", change: "-0.41%", color: "text-red-400" },
  { name: "Ethereum", symbol: "ETH", price: "$4,370.89", change: "+1.33%", color: "text-green-400" },
  { name: "Solana", symbol: "SOL", price: "$206.75", change: "-1.1%", color: "text-red-400" },
];

export default function CryptoList() {
  return (
    <div className="px-4 space-y-3">
      {cryptos.map((coin, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-white/5 rounded-lg p-3"
        >
          <div>
            <p className="font-semibold">{coin.symbol}</p>
            <p className="text-xs text-gray-400">{coin.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">{coin.price}</p>
            <p className={`text-xs ${coin.color}`}>{coin.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
