// components/OrderBook.tsx
interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
  type: 'buy' | 'sell';
}

const OrderBook: React.FC = () => {
  // Mock order book data
  const buyOrders: OrderBookEntry[] = [
    { price: 42560.12, amount: 1.245, total: 52987.35, type: 'buy' },
    { price: 42555.45, amount: 2.134, total: 90845.67, type: 'buy' },
    { price: 42550.89, amount: 0.876, total: 37294.12, type: 'buy' },
    { price: 42545.23, amount: 3.456, total: 147120.89, type: 'buy' },
    { price: 42540.67, amount: 1.234, total: 52504.12, type: 'buy' },
  ];

  const sellOrders: OrderBookEntry[] = [
    { price: 42565.34, amount: 0.987, total: 42023.45, type: 'sell' },
    { price: 42570.12, amount: 2.345, total: 99823.45, type: 'sell' },
    { price: 42575.89, amount: 1.567, total: 66723.45, type: 'sell' },
    { price: 42580.45, amount: 0.876, total: 37304.12, type: 'sell' },
    { price: 42585.67, amount: 3.456, total: 147234.12, type: 'sell' },
  ];

  return (
    <div className="divide-y divide-gray-800">
      {/* Buy Orders */}
      <div className="p-3">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>قیمت (USDT)</span>
          <span>مقدار (BTC)</span>
          <span>مجموع</span>
        </div>
        {buyOrders.map((order, index) => (
          <div 
            key={index} 
            className="flex justify-between py-2 hover:bg-gray-800/50 cursor-pointer"
            style={{ 
              background: `linear-gradient(90deg, rgba(34, 197, 94, 0.1) ${(index + 1) * 15}%, transparent 0%)`
            }}
          >
            <span className="text-green-400 font-medium">
              ${order.price.toLocaleString()}
            </span>
            <span className="text-white">{order.amount.toFixed(3)}</span>
            <span className="text-gray-300">
              ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>

      {/* Current Price */}
      <div className="p-3 bg-gray-800/30">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">$42,567.89</div>
          <div className="text-green-400 text-sm">+2.34%</div>
        </div>
      </div>

      {/* Sell Orders */}
      <div className="p-3">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>قیمت (USDT)</span>
          <span>مقدار (BTC)</span>
          <span>مجموع</span>
        </div>
        {sellOrders.map((order, index) => (
          <div 
            key={index} 
            className="flex justify-between py-2 hover:bg-gray-800/50 cursor-pointer"
            style={{ 
              background: `linear-gradient(90deg, rgba(239, 68, 68, 0.1) ${(index + 1) * 15}%, transparent 0%)`
            }}
          >
            <span className="text-red-400 font-medium">
              ${order.price.toLocaleString()}
            </span>
            <span className="text-white">{order.amount.toFixed(3)}</span>
            <span className="text-gray-300">
              ${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;