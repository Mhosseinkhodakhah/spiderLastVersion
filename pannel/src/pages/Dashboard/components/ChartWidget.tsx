// components/ChartWidget.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter, ReferenceLine, ReferenceArea } from "recharts";

interface PositionMarker {
  time: string;
  price: number;
  type: 'buy' | 'sell';
  size: number;
  profit: number;
  currentPrice: number;
  id: string;
  weight: number;
}

interface ChartWidgetProps {
  timeframe: string;
  showIndicators: boolean;
  positionMarkers: PositionMarker[];
  marketData?: {
    lastPrice: string;
    lastBuyPrice: string;
    lastSellPrice: string;
    lastState: string | number;
  };
  priceHistory: any[];
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ 
  timeframe, 
  showIndicators,
  positionMarkers = [],
  marketData,
  priceHistory
}) => {
  
  // Generate chart data from your price history
  const generateChartData = () => {
    if (!priceHistory || priceHistory.length === 0) {
      // Fallback mock data if no price history
      const data = [];
      const basePrice = 42500;
      
      for (let i = 0; i < 100; i++) {
        const time = new Date(Date.now() - (100 - i) * 3600000).toISOString();
        const priceChange = Math.sin(i / 10) * 500;
        
        data.push({
          time: time.substring(11, 16),
          price: basePrice + priceChange,
          volume: Math.random() * 1000 + 500,
        });
      }
      return data;
    }
    
    // Use your actual price data
    return priceHistory.map((pricePoint: any, index: number) => {
      const timestamp = pricePoint.timestamp || Date.now() - (priceHistory.length - index) * 60000;
      const time = new Date(timestamp).toLocaleTimeString('fa-IR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      return {
        time: time,
        price: parseFloat(pricePoint.price) || 0,
        volume: parseFloat(pricePoint.volume) || 0,
        // Add other metrics if available
      };
    });
  };

  const chartData = generateChartData();
  
  // Current price from market data
  const currentPrice = marketData?.lastPrice ? parseFloat(marketData.lastPrice) : 
    (chartData.length > 0 ? chartData[chartData.length - 1].price : 0);

  // Custom tooltip for position markers
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      if (data.position) {
        // Position marker tooltip
        const pos = data.position;
        return (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
            <div className="text-sm font-bold mb-2">
              {pos.type === 'buy' ? '🟢 موقعیت خرید' : '🔴 موقعیت فروش'}
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">قیمت ورود:</span>
                <span className="text-white">${pos.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">حجم:</span>
                <span className="text-white">${pos.size.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">سود فعلی:</span>
                <span className={pos.profit >= 0 ? 'text-green-400' : 'text-red-400'}>
                  {pos.profit >= 0 ? '+' : ''}{pos.profit.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">وزن:</span>
                <span className="text-white">{pos.weight.toFixed(8)} BTC</span>
              </div>
            </div>
          </div>
        );
      }
      
      // Regular price tooltip
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
          <div className="text-sm font-bold text-white mb-2">{label}</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">قیمت:</span>
              <span className="text-white">${data.price?.toLocaleString()}</span>
            </div>
            {data.volume && (
              <div className="flex justify-between">
                <span className="text-gray-400">حجم:</span>
                <span className="text-white">{data.volume.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Add position markers to chart data
  const chartDataWithPositions = chartData.map(point => ({ ...point }));
  
  // Add current price reference line
  const referenceLines : any = [
    // <ReferenceLine 
    //   key="current-price"
    //   y={currentPrice}
    //   stroke="#3B82F6"
    //   strokeWidth={1}
    //   strokeDasharray="3 3"
    //   label={{ 
    //     value: `$${currentPrice.toLocaleString()}`, 
    //     position: 'right',
    //     fill: '#3B82F6',
    //     fontSize: 12 
    //   }}
    // />
  ];

  // Add entry price lines for each position
// In the referenceLines section, add this:

positionMarkers.forEach((pos, index) => {
  console.log('its type', pos);
  
  // First, find the position's x coordinate (time index)
  let xPosition = 0;
  if (chartData.length > 0 && pos.time) {
    // Find the closest data point index
    let closestDiff = Infinity;
    chartData.forEach((dataPoint, idx) => {
      const dataTime = new Date(dataPoint.time ).getTime()|| idx * 60000;
      const diff = Math.abs(dataTime - new Date(pos.time ).getTime());
      if (diff < closestDiff) {
        closestDiff = diff;
        xPosition = idx;
      }
    });
  } else {
    // Fallback: evenly distribute if no timestamp
    xPosition = (index + 1) * (chartData.length / (positionMarkers.length + 1));
  }
  
  // Create a SHORT horizontal line using ReferenceArea
  // We'll create a narrow rectangle that looks like a short line
  const lineLength = 10; // Adjust this to control line length (in data index units)
  const startX = Math.max(0, xPosition - lineLength / 2);
  const endX = Math.min(chartData.length - 1, xPosition + lineLength / 2);
  
  referenceLines.push(
    <ReferenceArea 
      key={`short-horizontal-${pos.id}`}
      x1={startX}
      x2={endX}
      y1={pos.price}
      y2={pos.price}
      stroke={pos.type === 'buy' ? "#10B981" : "#EF4444"}
      strokeWidth={2} // Line thickness
      fill="none" // No fill, just the stroke
      label={{
        value: `${pos.type === 'buy' ? 'خرید' : 'فروش'}`,
        position: 'right',
        fill: pos.type === 'buy' ? '#10B981' : '#EF4444',
        fontSize: 8
      }}
    />
  );
});

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartDataWithPositions}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
            reversed={true}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
            domain={['auto', 'auto']}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Price line */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#3B82F6' }}
            name="قیمت"
          />
          
          {/* Reference lines for current price and positions */}
          {referenceLines}
          
          {/* Position markers as scatter points */}
          <Scatter
            name="موقعیت‌ها"
            data={positionMarkers.map(pos => ({
              time: pos.time,
              price: pos.price,
              position: pos
            }))}
            // fill={pos => pos.position.type === 'buy' ? "#10B981" : "#EF4444"}
            stroke="#fff"
            strokeWidth={2}
            r={6}
            shape="circle"
          />
          
          {/* Volume indicator if needed */}
          {/* {showIndicators && (
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#8B5CF6"
              strokeWidth={1}
              dot={false}
              yAxisId="right"
              opacity={0.5}
              name="حجم"
            />
          )} */}
        </LineChart>
      </ResponsiveContainer>
      
      {/* Position Legend */}
      {/* {positionMarkers.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="text-xs text-gray-400">موقعیت‌ها:</div>
          {positionMarkers.map(pos => (
            <div 
              key={pos.id}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs"
              style={{ 
                backgroundColor: pos.type === 'buy' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: pos.type === 'buy' ? '#10B981' : '#EF4444'
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{
                backgroundColor: pos.type === 'buy' ? '#10B981' : '#EF4444'
              }}></div>
              <span>${pos.price.toLocaleString()}</span>
              <span>({pos.type === 'buy' ? 'خرید' : 'فروش'})</span>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default ChartWidget;