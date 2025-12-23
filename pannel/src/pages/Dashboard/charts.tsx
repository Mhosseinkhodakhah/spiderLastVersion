// Positions.tsx - Main Dashboard Component
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getbalances, getPositions, market, price } from "../../server/admin";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Bitcoin, 
  Activity,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Coins,
  Wallet,
  BarChart3,
  Grid,
  List,
  Settings,
  RefreshCw,
  Maximize2,
  Download,
  Eye,
  EyeOff,
  Filter,
  Search,
  MoreVertical
} from "lucide-react";

// Import new components
import ChartWidget from "./components/ChartWidget";
import OrderBook from "./components/OrderBook";
import MarketTrades from "./components/MarketTrades";
import PositionsTable from "./components/PositionsTable";
import BalanceSummary from "./components/BalanceSummary";
import TechnicalIndicators from "./components/TechnicalIndicators";

// Define types (keep your existing types)
interface BalanceItem {
  [key: string]: {
    balance: string;
    locked: string;
    available: string;
  };
}

interface MarketStateData {
  lastPrice: string;
  lastBuyPrice: string;
  lastSellPrice: string;
  lastState: string | number;
  state: string | number;
  currencies: string;
  totalBalance: string;
  rsi: string;
}

interface PositionData {
  id: string;
  balance: string;
  currencie: string;
  createdAt: string;
  date: string;
  deletedAt: string | null;
  market: {
    createdAt: string;
    currencies: string;
    deletedAt: string | null;
    id: string;
    lastBuyPrice: string;
    lastPrice: string;
    lastSellPrice: string;
    lastState: string | number;
    profit: string;
    rsi: string;
    state: string | number;
    totalBalance: string;
    updatedAt: string;
  };
  milisecond: string;
  price: string;
  profit: string;
  setllement: boolean;
  time: string;
  type: string;
  updatedAt: string;
  weight: string;
}

export default function TradingDashboard() {
  const navigate = useNavigate();
  const [layout, setLayout] = useState("grid"); // "grid" | "list"
  const [showIndicators, setShowIndicators] = useState(true);
  const [timeframe, setTimeframe] = useState("1h");
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");

  // Fetch data (using your existing queries)
  const { data: balanceData, isLoading: balanceLoading } = useQuery<BalanceItem[]>({
    queryKey: ["getBalance"],
    queryFn: getbalances,
  });

  const { data: priceData, isLoading: priceLoading } = useQuery({
    queryKey: ["getPrice"],
    queryFn: price,
  });

  const { data: positions, isLoading: positionsLoading } = useQuery<{data: PositionData[]}>({
    queryKey: ["getPositions"],
    queryFn: getPositions,
  });

  const { data: marketState } = useQuery({
    queryKey: ["getMarket"],
    queryFn: market,
  });

  // Calculate market stats from marketState
  const calculateMarketStats = () => {
    if (!marketState?.data?.[0]) return null;
    
    const marketData = marketState.data[0];
    const totalBalance = +marketData.totalBalance || 0;
    const previousBalance = +marketState.data[marketState.data.length - 1]?.totalBalance || 0;
    const priceChange = previousBalance ? ((totalBalance - previousBalance) / previousBalance) * 100 : 0;
    
    return {
      isBullish: priceChange > 0,
      totalBalance,
      activeCurrencies: parseInt(marketData.currencies) || 0,
      priceChange: Math.abs(priceChange),
      rsi: +marketData.rsi || 50,
      marketStatus: priceChange > 0 ? 'bullish' : 'bearish',
      lastPrice: +marketData.lastPrice || 0,
      lastState: +marketData.lastState || 0
    };
  };

  const marketStats = calculateMarketStats();

  // Calculate position markers for the chart
  const getPositionMarkers = () => {
    if (!positions?.data) return [];
    
    return positions.data
    //   .filter(pos => !pos.setllement) // Only active positions
      .map((pos) => {
        const entryPrice = parseFloat(pos.price) || 0;
        const profit = parseFloat(pos.profit) || 0;
        const currentPrice = entryPrice * (1 + profit / 100);
        
        return {
          time: new Date(pos.createdAt).toLocaleTimeString('fa-IR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          price: entryPrice,
          type: pos.type,
          size: parseFloat(pos.balance) || 0,
          profit: profit,
          currentPrice: currentPrice,
          id: pos.id,
          weight: parseFloat(pos.weight) || 0,
          currency: pos.currencie
        };
      });
  };

  // Calculate summary statistics
  const calculateStats = () => {
    let totalProfit = 0;
    let activePositions = 0;
    let totalBalance = 0;
    let totalProfitUSD = 0;

    if (positions?.data) {
      positions.data.forEach(pos => {
        const profit = parseFloat(pos.profit) || 0;
        totalProfit += profit;
        if (!pos.setllement) {
          activePositions++;
          totalBalance += parseFloat(pos.balance) || 0;
          // Calculate profit in USD (simplified - adjust based on your actual calculation)
          const positionProfitUSD = (parseFloat(pos.balance) || 0) * (profit / 100);
          totalProfitUSD += positionProfitUSD;
        }
      });
    }

    return { 
      totalProfit, 
      activePositions, 
      totalBalance,
      totalProfitUSD,
      avgProfit: activePositions > 0 ? totalProfit / activePositions : 0
    };
  };

  const stats = calculateStats();

  // Timeframe options
  const timeframeOptions = [
    { label: "1m", value: "1m" },
    { label: "5m", value: "5m" },
    { label: "15m", value: "15m" },
    { label: "1h", value: "1h" },
    { label: "4h", value: "4h" },
    { label: "1d", value: "1d" },
    { label: "1w", value: "1w" },
  ];

  // Trading pairs
  const tradingPairs = [
    { symbol: "BTC/USDT", change: "+2.34%", price: "42,567.89" },
    { symbol: "ETH/USDT", change: "-1.23%", price: "2,345.67" },
    { symbol: "SOL/USDT", change: "+5.67%", price: "123.45" },
    { symbol: "XRP/USDT", change: "+0.89%", price: "0.5678" },
  ];

  if (balanceLoading || positionsLoading || priceLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-blue-400">در حال بارگذاری داشبورد...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Top Header Bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Bitcoin className="w-6 h-6 text-yellow-400" />
              <h1 className="text-xl font-bold text-white">Spider Trading Dashboard</h1>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-400">اتصال:</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-400 text-sm">آنلاین</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timeframe Selector */}
            <div className="flex items-center bg-gray-800 rounded-lg p-1">
              {timeframeOptions.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf.value)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    timeframe === tf.value
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {/* Layout Toggle */}
            <button
              onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              title={layout === "grid" ? "نمایش لیست" : "نمایش شبکه‌ای"}
            >
              {layout === "grid" ? (
                <List className="w-5 h-5" />
              ) : (
                <Grid className="w-5 h-5" />
              )}
            </button>

            {/* Refresh Button */}
            <button 
              onClick={() => {
                // Refresh all queries
                window.location.reload();
              }}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Settings */}
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-4 space-y-4">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Market Price */}
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">قیمت BTC/USDT</span>
              {marketStats?.marketStatus === 'bullish' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className="text-2xl font-bold text-white">
              {marketStats ? `$${marketStats.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '$0.00'}
            </div>
            <div className={`text-sm mt-1 ${marketStats?.marketStatus === 'bullish' ? 'text-green-400' : 'text-red-400'}`}>
              {marketStats ? `${marketStats.priceChange > 0 ? '+' : ''}${marketStats.priceChange.toFixed(2)}%` : '0.00%'} (24h)
            </div>
          </div>

          {/* Active Positions Count */}
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">موقعیت‌های فعال</span>
              <div className={`w-2 h-2 rounded-full ${
                stats.activePositions > 0 ? 
                'bg-green-500 animate-pulse' : 'bg-gray-500'
              }`}></div>
            </div>
            <div className="text-2xl font-bold text-white">
              {stats.activePositions}
            </div>
            <div className="text-gray-400 text-sm mt-1">
              ${stats.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })} ارزش کل
            </div>
          </div>

          {/* Average Position Profit */}
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">میانگین سود</span>
              {stats.avgProfit >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className={`text-2xl font-bold ${stats.avgProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.avgProfit >= 0 ? '+' : ''}{stats.avgProfit.toFixed(2)}%
            </div>
            <div className="text-gray-400 text-sm mt-1">
              بر اساس {stats.activePositions} موقعیت
            </div>
          </div>

          {/* Total Profit */}
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">سود کل</span>
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <div className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${stats.totalProfitUSD.toFixed(2)}
            </div>
            <div className="text-gray-400 text-sm mt-1">
              {(stats.totalProfit >= 0 ? '+' : '') + stats.totalProfit.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl border border-gray-800">
              {/* Chart Header - Update with real data */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-6 h-6 text-yellow-400" />
                    <div>
                      <div className="font-bold text-white">BTC/USDT</div>
                      <div className="text-sm text-gray-400">
                        {marketStats?.lastPrice ? 
                          `$${marketStats.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 
                          'در حال بارگذاری...'}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${
                    marketStats?.lastState === 1 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {marketStats?.lastPrice ? 
                      `$${marketStats.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 
                      '--'}
                  </div>
                  <div className={`px-2 py-1 rounded text-sm ${
                    marketStats?.marketStatus === 'bullish' ? 
                    'bg-green-500/20 text-green-400' : 
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {marketStats ? 
                      `${marketStats.marketStatus === 'bullish' ? '+' : ''}${marketStats.priceChange.toFixed(2)}%` : 
                      '0.00%'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-800 rounded">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded">
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setShowIndicators(!showIndicators)}
                    className="p-2 hover:bg-gray-800 rounded"
                  >
                    {showIndicators ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Updated Chart Widget with real position data */}
              <div className="h-[500px] p-4">
                <ChartWidget 
                  timeframe={timeframe}
                  showIndicators={showIndicators}
                  positionMarkers={getPositionMarkers()}
                  marketData={marketState?.data?.[0]}
                  priceHistory={priceData?.data || []}
                />
              </div>

              {/* Chart Tools */}
              <div className="flex items-center justify-between p-4 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-blue-600 rounded text-sm">نمودار</button>
                  <button className="px-3 py-1 bg-gray-800 rounded text-sm">عمق بازار</button>
                  <button className="px-3 py-1 bg-gray-800 rounded text-sm">معاملات</button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-sm text-gray-400 hover:text-white">اندیکاتورها</button>
                  <button className="text-sm text-gray-400 hover:text-white">الگوها</button>
                  <button className="text-sm text-gray-400 hover:text-white">تنظیمات</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trading Panel */}
          <div className="space-y-4">
            {/* Order Book */}
            <div className="bg-gray-900 rounded-xl border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">دفتر سفارشات</h3>
                  <div className="text-sm text-gray-400">تفاوت: 0.12%</div>
                </div>
              </div>
              <OrderBook />
            </div>

            {/* Market Trades */}
            <div className="bg-gray-900 rounded-xl border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <h3 className="font-bold text-white">معاملات اخیر</h3>
              </div>
              <MarketTrades />
            </div>

            {/* Trading Pairs */}
            <div className="bg-gray-900 rounded-xl border border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">جفت ارزها</h3>
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="p-2">
                {tradingPairs.map((pair) => (
                  <div
                    key={pair.symbol}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-800 ${
                      selectedPair === pair.symbol ? "bg-gray-800" : ""
                    }`}
                    onClick={() => setSelectedPair(pair.symbol)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        pair.symbol.includes("BTC") ? "bg-yellow-500/20" :
                        pair.symbol.includes("ETH") ? "bg-gray-500/20" :
                        "bg-purple-500/20"
                      }`}>
                        <span className="text-xs font-bold">
                          {pair.symbol.split("/")[0].charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-white">{pair.symbol}</div>
                        <div className="text-sm text-gray-400">بایننس</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">${pair.price}</div>
                      <div className={`text-sm ${
                        pair.change.startsWith("+") ? "text-green-400" : "text-red-400"
                      }`}>
                        {pair.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Positions & Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Positions Table - Update with real data */}
          <div className="bg-gray-900 rounded-xl border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">موقعیت‌های باز</h3>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <PositionsTable 
              positions={positions?.data || []} 
              priceData={priceData?.data || []}
            />
          </div>

          {/* Balance & Technical Indicators */}
          <div className="space-y-4">
            <BalanceSummary balanceData={balanceData || []} />
            {showIndicators && <TechnicalIndicators />}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span className="text-xs mt-1 text-gray-400">نمودار</span>
          </button>
          <button className="flex flex-col items-center">
            <List className="w-5 h-5 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">سفارشات</span>
          </button>
          <button className="flex flex-col items-center">
            <Activity className="w-5 h-5 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">معاملات</span>
          </button>
          <button className="flex flex-col items-center">
            <Wallet className="w-5 h-5 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">کیف پول</span>
          </button>
        </div>
      </div>
    </div>
  );
}