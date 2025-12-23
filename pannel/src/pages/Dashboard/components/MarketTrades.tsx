// components/MarketTrades.tsx
interface Trade {
  id: string;
  time: string;
  price: number;
  amount: number;
  type: 'buy' | 'sell';
}

const MarketTrades: React.FC = () => {
  // Mock trade data
  const trades: Trade[] = [
    { id: '1', time: '12:45:23', price: 42567.89, amount: 0.123, type: 'buy' },
    { id: '2', time: '12:45:21', price: 42566.45, amount: 1.234, type: 'sell' },
    { id: '3', time: '12:45:18', price: 42567.12, amount: 0.567, type: 'buy' },
    { id: '4', time: '12:45:15', price: 42565.34, amount: 2.345, type: 'buy' },
    { id: '5', time: '12:45:12', price: 42564.89, amount: 0.876, type: 'sell' },
    { id: '6', time: '12:45:09', price: 42563.45, amount: 1.567, type: 'buy' },
    { id: '7', time: '12:45:06', price: 42562.12, amount: 0.987, type: 'sell' },
  ];

  return (
    <div className="max-h-80 overflow-y-auto">
      <div className="flex justify-between text-sm text-gray-400 p-3 border-b border-gray-800 sticky top-0 bg-gray-900">
        <span>زمان</span>
        <span>قیمت (USDT)</span>
        <span>مقدار (BTC)</span>
      </div>
      {trades.map((trade) => (
        <div 
          key={trade.id}
          className="flex justify-between p-3 border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer"
        >
          <span className="text-gray-400 text-sm">{trade.time}</span>
          <span className={`font-medium ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
            ${trade.price.toLocaleString()}
          </span>
          <span className="text-white">{trade.amount.toFixed(3)}</span>
        </div>
      ))}
    </div>
  );
};

export default MarketTrades;